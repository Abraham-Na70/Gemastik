import DemoJobCard from "../components/Jobs/JobCard";
import {
	Container,
	Grid,
	Title,
	Text,
	Alert,
	Skeleton,
	Card,
	Stack,
	Group,
	Badge,
	Center,
	Button,
} from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { getJobs } from "../api/jobs";
import { getCompanies } from "../api/company";
import { useNavigate } from "react-router-dom";
import {
	IconBriefcase,
	IconAlertCircle,
	IconSearch,
	IconTrendingUp,
	IconUsers,
} from "@tabler/icons-react";

const Home = () => {
	const navigate = useNavigate();
	const [jobs, setJobs] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Memoized company lookup for efficient company name resolution
	const companyMap = useMemo(() => {
		const map = new Map();
		companies.forEach((company) => {
			const companyId = company._id?.["$oid"] || company._id || company.id;
			map.set(companyId, company.name);
		});
		return map;
	}, [companies]);

	// Memoized stats calculation
	const stats = useMemo(() => {
		if (!jobs.length) return { total: 0, skills: 0, companies: 0 };

		const uniqueSkills = new Set();
		const uniqueCompanies = new Set();

		jobs.forEach((job) => {
			if (job.skills) {
				job.skills.forEach((skill) => uniqueSkills.add(skill));
			}
			if (job.company_id) {
				uniqueCompanies.add(job.company_id);
			}
		});

		return {
			total: jobs.length,
			skills: uniqueSkills.size,
			companies: uniqueCompanies.size,
		};
	}, [jobs]);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				// Fetch jobs and companies in parallel
				const [jobsData, companiesData] = await Promise.all([
					getJobs(),
					getCompanies(),
				]);

				setJobs(jobsData.data);
				setCompanies(companiesData.data);
				console.log("Jobs data fetched:", jobsData.data);
				console.log("Companies data fetched:", companiesData.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	// Loading skeleton component
	const LoadingSkeleton = () => (
		<Grid align="stretch" gutter="lg">
			{Array(6)
				.fill(0)
				.map((_, index) => (
					<Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={index}>
						<Card shadow="lg" padding="lg" radius="xl" className="h-full">
							<Card.Section>
								<Skeleton height={180} />
							</Card.Section>
							<Stack spacing="md" className="pt-4">
								<Group spacing="xs">
									<Skeleton height={32} width={32} radius="lg" />
									<Skeleton height={24} className="flex-1" />
								</Group>
								<Skeleton height={60} />
								<Group spacing="xs">
									<Skeleton height={24} width={60} radius="md" />
									<Skeleton height={24} width={80} radius="md" />
									<Skeleton height={24} width={70} radius="md" />
								</Group>
								<Skeleton height={40} radius="lg" />
							</Stack>
						</Card>
					</Grid.Col>
				))}
		</Grid>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
			<Container size="xl" className="py-8">
				{/* Header Section */}
				<div
					className="text-center mb-12"
					style={{ textAlign: "center", width: "100%" }}
				>
					<div
						className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6"
						style={{ margin: "0 auto 1.5rem auto" }}
					>
						<IconBriefcase size={40} className="text-blue-600" />
					</div>
					<Title
						order={1}
						className="text-4xl font-bold text-gray-800 mb-4 text-center mx-auto"
						style={{
							background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							color: "transparent",
							display: "block",
							textAlign: "center",
							width: "100%",
							margin: "0 auto 1rem auto",
						}}
					>
						Discover Your Dream Job
					</Title>
					<Text
						size="lg"
						className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
						style={{
							textAlign: "center",
							display: "block",
							width: "100%",
							margin: "0 auto",
						}}
					>
						Explore exciting career opportunities and find the perfect role that
						matches your skills and ambitions.
					</Text>
				</div>

				{/* Stats Cards */}
				{!loading && !error && jobs.length > 0 && (
					<Grid gutter="lg" className="mb-12">
						<Grid.Col span={{ base: 12, sm: 4 }}>
							<Card
								shadow="md"
								padding="lg"
								radius="xl"
								className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-0"
							>
								<IconBriefcase
									size={32}
									className="text-blue-600 mx-auto mb-3"
								/>
								<Title order={2} className="text-2xl font-bold text-blue-700">
									{stats.total}
								</Title>
								<Text size="sm" className="text-blue-600 font-medium">
									Available Jobs
								</Text>
							</Card>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 4 }}>
							<Card
								shadow="md"
								padding="lg"
								radius="xl"
								className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-0"
							>
								<IconTrendingUp
									size={32}
									className="text-green-600 mx-auto mb-3"
								/>
								<Title order={2} className="text-2xl font-bold text-green-700">
									{stats.skills}
								</Title>
								<Text size="sm" className="text-green-600 font-medium">
									Skill Categories
								</Text>
							</Card>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 4 }}>
							<Card
								shadow="md"
								padding="lg"
								radius="xl"
								className="text-center bg-gradient-to-br from-purple-50 to-violet-100 border-0"
							>
								<IconUsers size={32} className="text-purple-600 mx-auto mb-3" />
								<Title order={2} className="text-2xl font-bold text-purple-700">
									{stats.companies}
								</Title>
								<Text size="sm" className="text-purple-600 font-medium">
									Hiring Companies
								</Text>
							</Card>
						</Grid.Col>
					</Grid>
				)}

				{/* Content Section */}
				{loading ? (
					<LoadingSkeleton />
				) : error ? (
					<Center className="py-20">
						<Alert
							icon={<IconAlertCircle size="1.5rem" />}
							title="Unable to Load Jobs"
							color="red"
							variant="filled"
							className="max-w-md shadow-lg"
						>
							{error.message ||
								"Failed to fetch job listings. Please try again later."}
						</Alert>
					</Center>
				) : jobs.length === 0 ? (
					<Center className="py-20">
						<Stack spacing="lg" align="center">
							<div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
								<IconSearch size={48} className="text-gray-400" />
							</div>
							<div className="text-center">
								<Title order={3} className="text-gray-700 mb-2">
									No Jobs Available
								</Title>
								<Text className="text-gray-500">
									There are currently no job listings. Check back later for new
									opportunities!
								</Text>
							</div>
							<Button
								variant="light"
								color="blue"
								onClick={() => window.location.reload()}
							>
								Refresh Page
							</Button>
						</Stack>
					</Center>
				) : (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<Group spacing="md">
								<Title order={2} className="text-gray-800">
									Available Positions
								</Title>
								<Badge
									color="blue"
									variant="light"
									size="lg"
									className="font-medium"
								>
									{jobs.length} Jobs
								</Badge>
							</Group>
						</div>

						<Grid align="stretch" gutter="lg">
							{jobs.map((job) => {
								const companyName = companyMap.get(job.company_id) || "Company";
								return (
									<Grid.Col
										span={{ base: 12, sm: 6, lg: 4 }}
										key={job.id || job._id}
									>
										<DemoJobCard
											title={job.title}
											description={job.description}
											skills={job.skills}
											jobType={job.jobType || "Full-time"}
											companyName={companyName}
											companyId={job.company_id}
											location={job.location || "Remote"}
											imageUrl={job.imageUrl || "/img/download.png"}
											showCompanyLink={true}
											context="general" // Homepage context
											onClick={() => {
												const jobId = job._id?.["$oid"] || job._id || job.id;
												navigate(`/job/${jobId}`);
											}}
										/>
									</Grid.Col>
								);
							})}
						</Grid>
					</div>
				)}
			</Container>
		</div>
	);
};

export default Home;
