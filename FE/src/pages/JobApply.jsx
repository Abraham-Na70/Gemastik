import { useParams } from "react-router-dom";
import { getJobbyId } from "../api/jobs";
import { getCompanyById } from "../api/company";
import { useEffect, useState } from "react";
import { JobCardView } from "../components/Jobs/JobCardView";
import {
	Container,
	Text,
	Alert,
	Skeleton,
	Card,
	Stack,
	Group,
	Button,
	Modal,
	Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { postInterview } from "../api/interview";
import {
	IconAlertCircle,
	IconBriefcase,
	IconCheck,
	IconLoader,
} from "@tabler/icons-react";

export const JobApply = () => {
	const [jobData, setJobData] = useState(null);
	const [companyData, setCompanyData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [applying, setApplying] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const handleApplyConfirm = async () => {
		setApplying(true);
		setError(null);

		try {
			console.log("Applying for job with ID:", id);
			const response = await postInterview(id);

			// Show success notification
			console.log("Interview request sent successfully:", response.data);

			const interview_id = response.data.interview_id;
			setConfirmModal(false);

			// Navigate to chat after successful application
			navigate(`/chat/${interview_id}`);
		} catch (error) {
			console.error("Error applying for job:", error);
			setError(error);
		} finally {
			setApplying(false);
		}
	};

	const showApplyConfirmation = () => {
		setConfirmModal(true);
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
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
			{/* Confirmation Modal */}
			<Modal
				opened={confirmModal}
				onClose={() => setConfirmModal(false)}
				title={
					<Group spacing="xs">
						<IconBriefcase size={20} className="text-green-600" />
						<Title order={4}>Confirm Job Application</Title>
					</Group>
				}
				centered
				size="md"
			>
				<Stack spacing="md">
					<Text size="sm" className="text-gray-600">
						Are you sure you want to apply for this position? This will start an
						AI interview session.
					</Text>

					{jobData && (
						<Card className="bg-green-50 border border-green-200" padding="md">
							<Text weight={500} className="text-green-800">
								{jobData.title}
							</Text>
							<Text size="sm" className="text-green-600 mt-1">
								This application will initiate an interview process
							</Text>
						</Card>
					)}

					<Group className="justify-end" spacing="sm">
						<Button
							variant="light"
							color="gray"
							onClick={() => setConfirmModal(false)}
							disabled={applying}
						>
							Cancel
						</Button>
						<Button
							color="green"
							onClick={handleApplyConfirm}
							loading={applying}
							leftSection={
								applying ? <IconLoader size={16} /> : <IconCheck size={16} />
							}
						>
							{applying ? "Applying..." : "Confirm Application"}
						</Button>
					</Group>
				</Stack>
			</Modal>

			{/* Main Content */}
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
			) : (
				<JobCardView
					jobTitle={jobData.title}
					JobDesc={jobData.description}
					JobSkills={jobData.skills}
					companyName={companyData?.name || "Company"}
					location={jobData.location || "Remote"}
					onBack={() => navigate(-1)}
					isApply={true}
					onEdit={showApplyConfirmation}
				/>
			)}
		</div>
	);
};
