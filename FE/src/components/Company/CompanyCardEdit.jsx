import {
	Stack,
	Textarea,
	TextInput,
	Title,
	Card,
	Text,
	Group,
	Button,
	Container,
	Alert,
	Loader,
} from "@mantine/core";
import { useState } from "react";
import {
	IconBuilding,
	IconCheck,
	IconX,
	IconFileText,
	IconAlertCircle,
} from "@tabler/icons-react";

export const CompanyCardEdit = ({
	companyTitle = "",
	companyDesc = "",
	onSave,
	onCancel,
	isEdit = true,
	isLoading = false,
}) => {
	const [title, setTitle] = useState(companyTitle || "");
	const [desc, setDesc] = useState(companyDesc || "");
	const [formError, setFormError] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError(null);

		if (!title.trim() || !desc.trim()) {
			setFormError("Please fill in all required fields");
			return;
		}

		if (onSave) {
			const data = {
				name: title.trim(),
				description: desc.trim(),
			};
			onSave(data);
		}
	};
	return (
		<Card
			shadow="xl"
			padding="xl"
			radius="lg"
			style={{
				background: "rgba(255, 255, 255, 0.95)",
				backdropFilter: "blur(10px)",
				border: "1px solid rgba(255, 255, 255, 0.3)",
			}}
		>
			<Stack spacing="md">
				<Group spacing="sm" mb="md" style={{ justifyContent: "center" }}>
					<IconBuilding size={28} color="#10b981" />
					<Title
						order={2}
						style={{
							background: "linear-gradient(45deg, #10b981, #059669)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							textAlign: "center",
						}}
					>
						{isEdit ? "Edit Company" : "Add New Company"}
					</Title>
				</Group>

				{formError && (
					<Alert
						icon={<IconAlertCircle size={16} />}
						title="Error"
						color="red"
						variant="filled"
						mb="lg"
					>
						{formError}
					</Alert>
				)}

				{isLoading && (
					<div style={{ textAlign: "center", padding: "2rem" }}>
						<Loader size="lg" color="#10b981" />
						<Text mt="sm" color="dimmed">
							Loading...
						</Text>
					</div>
				)}

				{!isLoading && (
					<form onSubmit={handleSubmit}>
						<Stack spacing="md">
							<TextInput
								label="Company Name"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								icon={<IconBuilding size={16} />}
								placeholder="Enter company name"
							/>

							<Textarea
								label="Company Description"
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
								required
								autosize
								minRows={5}
								maxRows={10}
								icon={<IconFileText size={16} />}
								placeholder="Describe your company..."
							/>

							<Group mt="xl" style={{ justifyContent: "center" }}>
								<Button
									variant="outline"
									color="red"
									onClick={onCancel}
									leftIcon={<IconX size={16} />}
									size="md"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variant="filled"
									style={{
										background: "linear-gradient(45deg, #10b981, #059669)",
										border: "none",
									}}
									leftIcon={<IconCheck size={16} />}
									size="md"
								>
									Save Changes
								</Button>
							</Group>
						</Stack>
					</form>
				)}
			</Stack>
		</Card>
	);
};
