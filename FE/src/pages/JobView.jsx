import {
	Card,
	Container,
	Stack,
	Title,
	Text,
	Group,
	Button,
	Loader,
	Alert,
	Skeleton,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { getJobbyId } from "../api/jobs";
import { getCompanyById } from "../api/company";
import { useEffect, useState } from "react";
import { JobCardView } from "../components/Jobs/JobCardView";
import { JobCardEditForm } from "../components/Jobs/JobCardEdit";
import { updateJob } from "../api/jobs";
import { IconAlertCircle, IconBriefcase } from "@tabler/icons-react";

export const JobView = () => {
	const [jobData, setJobData] = useState(null);
	const [companyData, setCompanyData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams(); // Get the job ID from the URL parameters

	// milik job edit
	const [editMode, setEditMode] = useState(false);
	const [updating, setUpdating] = useState(false);
	const handleSave = async (updatedJob) => {
		setUpdating(true);
		setError(null);

		try {
			await updateJob(id, updatedJob);
			// Setelah update, fetch ulang data detail
			const detail = await getJobbyId(id);
			setJobData(detail.data);
			setEditMode(false);
		} catch (error) {
			console.error("Error updating job:", error);
			setError(error);
		} finally {
			setUpdating(false);
		}
	};

	const handleCancel = () => {
		setEditMode(false);
	};

	useEffect(() => {
		const fetchJobData = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await getJobbyId(id);
				setJobData(data.data);
				console.log("Job data fetched:", data.data);

				// Fetch company data if company_id exists
				if (data.data.company_id) {
					try {
						const company = await getCompanyById(data.data.company_id);
						setCompanyData(company.data);
						console.log("Company data fetched:", company.data);
					} catch (companyError) {
						console.error("Error fetching company data:", companyError);
						// Don't set error state for company fetch failure
					}
				}
			} catch (error) {
				console.error("Error fetching job data:", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchJobData();
		}
	}, [id]); // Loading skeleton component
	const LoadingSkeleton = () => (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
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
							<Group spacing="sm">
								<Skeleton height={32} width={80} radius="md" />
								<Skeleton height={32} width={100} radius="md" />
								<Skeleton height={32} width={90} radius="md" />
							</Group>
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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{loading ? (
				<LoadingSkeleton />
			) : error ? (
				<div className="py-8">
					<Container size="md">
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Error Loading Job"
							color="red"
							variant="filled"
							className="shadow-lg"
						>
							{error.message || "Failed to load job data. Please try again."}
						</Alert>
					</Container>
				</div>
			) : !jobData ? (
				<div className="py-8">
					<Container size="md">
						<Alert
							icon={<IconBriefcase size="1rem" />}
							title="Job Not Found"
							color="yellow"
							variant="filled"
							className="shadow-lg"
						>
							The requested job could not be found.
						</Alert>
					</Container>
				</div>
			) : editMode ? (
				<div
					style={{
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
								<IconBriefcase size={32} color="white" />
								<Title
									order={1}
									style={{
										color: "white",
										textAlign: "center",
										textShadow: "0 2px 4px rgba(0,0,0,0.3)",
									}}
								>
									Edit Job
								</Title>
							</Group>
							<Text
								size="lg"
								style={{
									color: "rgba(255, 255, 255, 0.9)",
									textAlign: "center",
								}}
							>
								Update job information for "{jobData.title}"
							</Text>
						</div>

						{/* Loading State */}
						{updating && (
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
									Updating job...
								</Text>
							</div>
						)}

						{/* Job Form */}
						<JobCardEditForm
							jobTitle={jobData.title}
							JobDesc={jobData.description}
							JobSkills={jobData.skills}
							CompanyId={jobData.company_id}
							allSkills={[
								"React",
								"Node",
								"Python",
								"JavaScript",
								"TypeScript",
								"Java",
								"C++",
								"Go",
							]}
							onSave={handleSave}
							onCancel={handleCancel}
							isLoading={updating}
						/>
					</Container>
				</div>
			) : (
				<JobCardView
					jobTitle={jobData.title}
					JobDesc={jobData.description}
					JobSkills={jobData.skills}
					companyName={companyData?.name || "Company"}
					companyId={jobData.company_id}
					location={jobData.location || "Remote"}
					onEdit={() => setEditMode(true)}
					showCompanyLink={true}
					context="dashboard" // Since this is from job detail view, treat as dashboard context
				/>
			)}
		</div>
	);
};
