import {
	Table,
	Button,
	Group,
	Text,
	Box,
	ActionIcon,
	Badge,
	Skeleton,
	Alert,
	Card,
	Title,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { getJobs } from "../../api/jobs";
import { useNavigate } from "react-router-dom";
import {
	IconPlus,
	IconEye,
	IconTrash,
	IconAlertCircle,
	IconBriefcase,
} from "@tabler/icons-react";

export const JobTable = () => {
	const [jobData, setJobData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const badgeColors = useMemo(
		() => [
			"blue",
			"cyan",
			"teal",
			"green",
			"lime",
			"yellow",
			"orange",
			"red",
			"grape",
			"violet",
			"indigo",
		],
		[]
	);

	// Memoize colors untuk setiap skill agar tidak berubah saat re-render
	const getConsistentColor = useMemo(() => {
		const colorMap = new Map();
		return (skill) => {
			if (!colorMap.has(skill)) {
				colorMap.set(
					skill,
					badgeColors[Math.floor(Math.random() * badgeColors.length)]
				);
			}
			return colorMap.get(skill);
		};
	}, [badgeColors]);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getJobs();
				setJobData(data.data || []);
			} catch (err) {
				setError("Failed to fetch job data. Please try again.");
				console.error("Error fetching job data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchJobs();
	}, []);

	const handleDelete = (jobId) => {
		// TODO: Implement delete functionality
		console.log("Delete job:", jobId);
	};

	if (loading) {
		return (
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<Skeleton height={32} width={200} />
					<Skeleton height={36} width={100} />
				</div>
				<div className="space-y-2">
					{[...Array(5)].map((_, index) => (
						<Skeleton key={index} height={60} />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				icon={<IconAlertCircle size={16} />}
				title="Error"
				color="red"
				className="mb-4"
			>
				{error}
			</Alert>
		);
	}

	const rows = jobData.map((job) => (
		<Table.Tr key={job.id} className="hover:bg-gray-50 transition-colors">
			<Table.Td className="font-medium text-gray-900">{job.title}</Table.Td>
			<Table.Td>
				<Group spacing="xs" wrap>
					{job.skills?.map((skill, index) => (
						<Badge
							color={getConsistentColor(skill)}
							variant="light"
							key={index}
							size="sm"
							className="font-medium"
						>
							{skill}
						</Badge>
					))}
				</Group>
			</Table.Td>
			<Table.Td>
				<Group spacing="xs">
					<Button
						variant="light"
						size="sm"
						color="blue"
						leftSection={<IconEye size={14} />}
						onClick={() => navigate(`/dashboard/job/${job._id}`)}
						className="hover:bg-blue-50"
					>
						View
					</Button>
					<Button
						variant="light"
						size="sm"
						color="red"
						leftSection={<IconTrash size={14} />}
						onClick={() => handleDelete(job.id)}
						className="hover:bg-red-50"
					>
						Delete
					</Button>
				</Group>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<Title order={3} className="text-2xl font-semibold text-gray-800">
						Job Listings
					</Title>
					<Text size="sm" color="dimmed" className="mt-1">
						{jobData.length} jobs available
					</Text>
				</div>
				<Button
					onClick={() => navigate("/dashboard/job/add")}
					variant="filled"
					color="blue"
					leftSection={<IconPlus size={16} />}
					className="bg-blue-600 hover:bg-blue-700 transition-colors"
				>
					Add New Job
				</Button>
			</div>

			{/* Table */}
			<Card className="border-0 shadow-sm">
				<Table
					striped
					highlightOnHover
					withBorder={false}
					withColumnBorders={false}
					horizontalSpacing="lg"
					verticalSpacing="md"
					className="text-sm"
				>
					<Table.Thead className="bg-gray-50">
						<Table.Tr>
							<Table.Th className="font-semibold text-gray-700 py-4">
								Job Title
							</Table.Th>
							<Table.Th className="font-semibold text-gray-700 py-4">
								Skills Required
							</Table.Th>
							<Table.Th className="font-semibold text-gray-700 py-4 text-center">
								Actions
							</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Card>

			{/* Empty State */}
			{jobData.length === 0 && !loading && (
				<div className="text-center py-12">
					<IconBriefcase size={48} className="text-gray-400 mx-auto mb-4" />
					<Title order={4} className="text-gray-600 mb-2">
						No jobs found
					</Title>
					<Text size="sm" color="dimmed" className="mb-4">
						Get started by adding your first job listing
					</Text>
					<Button
						onClick={() => navigate("/dashboard/job/add")}
						variant="filled"
						color="blue"
						leftSection={<IconPlus size={16} />}
					>
						Add New Job
					</Button>
				</div>
			)}
		</div>
	);
};
