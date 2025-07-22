import {
	Container,
	Text,
	Alert,
	Skeleton,
	Card,
	Stack,
	Group,
	Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCompanyById } from "../api/company";
import { CompanyCardView } from "../components/Company/CompanyCardView";
import { CompanyCardEdit } from "../components/Company/CompanyCardEdit";
import { updateCompany } from "../api/company";
import { IconAlertCircle, IconBuilding, IconLoader } from "@tabler/icons-react";

export const CompanyView = () => {
	const [companyData, setCompanyData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [updating, setUpdating] = useState(false);
	const { id } = useParams();

	const handleSave = async (updatedCompany) => {
		setUpdating(true);
		setError(null);

		try {
			console.log("Updated company data:", updatedCompany);
			await updateCompany(id, updatedCompany);

			// After updating, fetch the company data again to reflect changes
			const data = await getCompanyById(id);
			setCompanyData(data.data);
			console.log("Company data updated:", data.data);
			setEditMode(false);
		} catch (error) {
			console.error("Error updating company:", error);
			setError(error);
		} finally {
			setUpdating(false);
		}
	};

	const handleCancel = () => {
		setEditMode(false);
	};

	useEffect(() => {
		const fetchCompanyData = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await getCompanyById(id);
				setCompanyData(data.data);
				console.log("Company data fetched:", data.data);
			} catch (error) {
				console.error("Error fetching company data:", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchCompanyData();
		}
	}, [id]);
	// Loading skeleton component
	const LoadingSkeleton = () => (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
			<Container size="md">
				<Card
					shadow="xl"
					padding="xl"
					radius="xl"
					withBorder={false}
					className="bg-white border-0 shadow-2xl"
				>
					<Stack spacing="xl">
						<div className="text-center space-y-4">
							<Skeleton
								height={64}
								width={64}
								radius="xl"
								className="mx-auto"
							/>
							<Skeleton height={32} width="60%" className="mx-auto" />
						</div>
						<Skeleton height={1} />
						<div className="space-y-3">
							<Skeleton height={24} width="40%" />
							<Skeleton height={80} />
						</div>
						<Skeleton height={1} />
						<Group className="justify-between">
							<Skeleton height={36} width={150} />
							<Skeleton height={36} width={120} />
						</Group>
					</Stack>
				</Card>
			</Container>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
			{loading ? (
				<LoadingSkeleton />
			) : error ? (
				<div className="py-8">
					<Container size="md">
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Error Loading Company"
							color="red"
							variant="filled"
							className="shadow-lg"
						>
							{error.message ||
								"Failed to load company data. Please try again."}
						</Alert>
					</Container>
				</div>
			) : !companyData ? (
				<div className="py-8">
					<Container size="md">
						<Alert
							icon={<IconBuilding size="1rem" />}
							title="Company Not Found"
							color="yellow"
							variant="filled"
							className="shadow-lg"
						>
							The requested company could not be found.
						</Alert>
					</Container>
				</div>
			) : editMode ? (
				<div className="py-8">
					<Container size="md">
						<CompanyCardEdit
							onCancel={handleCancel}
							onSave={handleSave}
							isEdit={true}
							companyTitle={companyData.name}
							companyDesc={companyData.description}
							isLoading={updating}
						/>
					</Container>
				</div>
			) : (
				<CompanyCardView
					companyTitle={companyData.name}
					companyDesc={companyData.description}
					onEdit={() => setEditMode(true)}
				/>
			)}
		</div>
	);
};
