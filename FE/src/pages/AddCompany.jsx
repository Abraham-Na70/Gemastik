import {
	Container,
	Title,
	Alert,
	Button,
	Group,
	Text,
	Loader,
} from "@mantine/core";
import { CompanyCardEdit } from "../components/Company/CompanyCardEdit";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../api/company";
import { useState } from "react";
import {
	IconBuilding,
	IconArrowLeft,
	IconAlertCircle,
	IconCheck,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export const AddCompany = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSave = async (newCompany) => {
		setIsLoading(true);
		setError(null);

		try {
			console.log("New company saved:", newCompany);
			const response = await createCompany(newCompany);
			console.log("Company created successfully:", response);

			// Show success notification
			notifications.show({
				title: "Success!",
				message: "Company created successfully",
				color: "green",
				icon: <IconCheck size={16} />,
			});

			// Navigate to dashboard after success
			navigate("/dashboard");
		} catch (error) {
			console.error("Error creating company:", error);
			setError("Failed to create company. Please try again.");

			// Show error notification
			notifications.show({
				title: "Error",
				message: "Failed to create company. Please try again.",
				color: "red",
				icon: <IconAlertCircle size={16} />,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			style={{
				background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
				minHeight: "100vh",
				padding: "2rem 0",
			}}
		>
			<Container size="lg">
				{/* Header Section */}
				<div
					style={{
						background: "rgba(255, 255, 255, 0.1)",
						backdropFilter: "blur(10px)",
						border: "1px solid rgba(255, 255, 255, 0.2)",
						borderRadius: "16px",
						padding: "2rem",
						marginBottom: "2rem",
						textAlign: "center",
					}}
				>
					<Group spacing="sm" mb="md" style={{ justifyContent: "center" }}>
						<IconBuilding size={32} color="white" />
						<Title
							order={1}
							style={{
								color: "white",
								textAlign: "center",
								textShadow: "0 2px 4px rgba(0,0,0,0.3)",
							}}
						>
							Add New Company
						</Title>
					</Group>
					<Text
						size="lg"
						style={{
							color: "rgba(255, 255, 255, 0.9)",
							textAlign: "center",
						}}
					>
						Create a new company profile for your organization
					</Text>
				</div>

				{/* Back Button */}
				<Group mb="lg">
					<Button
						variant="subtle"
						color="white"
						leftIcon={<IconArrowLeft size={16} />}
						onClick={() => navigate("/dashboard")}
						style={{
							background: "rgba(255, 255, 255, 0.1)",
							border: "1px solid rgba(255, 255, 255, 0.2)",
							backdropFilter: "blur(10px)",
						}}
					>
						Back to Dashboard
					</Button>
				</Group>

				{/* Error Alert */}
				{error && (
					<Alert
						icon={<IconAlertCircle size={16} />}
						title="Error"
						color="red"
						variant="filled"
						mb="lg"
						style={{
							background: "rgba(220, 38, 38, 0.9)",
							backdropFilter: "blur(10px)",
						}}
					>
						{error}
					</Alert>
				)}

				{/* Loading State */}
				{isLoading && (
					<div
						style={{
							background: "rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(10px)",
							border: "1px solid rgba(255, 255, 255, 0.2)",
							borderRadius: "16px",
							padding: "3rem",
							textAlign: "center",
							marginBottom: "2rem",
						}}
					>
						<Loader size="lg" color="white" />
						<Text mt="md" style={{ color: "white" }}>
							Creating company...
						</Text>
					</div>
				)}

				{/* Company Form */}
				<CompanyCardEdit
					isEdit={false}
					isLoading={isLoading}
					onCancel={() => navigate("/dashboard")}
					onSave={handleSave}
				/>
			</Container>
		</div>
	);
};
