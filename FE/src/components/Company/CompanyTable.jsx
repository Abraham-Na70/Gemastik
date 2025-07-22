import {
	Button,
	Group,
	Table,
	Text,
	Skeleton,
	Alert,
	Card,
	Title,
} from "@mantine/core";
import { getCompanies } from "../../api/company";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	IconPlus,
	IconEye,
	IconTrash,
	IconAlertCircle,
	IconBuilding,
} from "@tabler/icons-react";

export const CompanyTable = () => {
	const navigate = useNavigate();
	const [companyData, setCompanyData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getCompanies();
				setCompanyData(data.data || []);
			} catch (err) {
				setError("Failed to fetch company data. Please try again.");
				console.error("Error fetching company data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCompanies();
	}, []);

	const handleDelete = (companyId) => {
		// TODO: Implement delete functionality
		console.log("Delete company:", companyId);
	};

	const truncateDescription = (description, wordLimit = 20) => {
		if (!description) return "";
		const words = description.split(" ");
		if (words.length <= wordLimit) return description;
		return words.slice(0, wordLimit).join(" ") + "...";
	};

	if (loading) {
		return (
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<Skeleton height={32} width={200} />
					<Skeleton height={36} width={120} />
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

	const rows = companyData.map((company) => (
		<Table.Tr key={company.id} className="hover:bg-gray-50 transition-colors">
			<Table.Td className="font-medium text-gray-900">{company.name}</Table.Td>
			<Table.Td>
				<Text
					size="sm"
					color="dimmed"
					style={{ whiteSpace: "pre-wrap" }}
					className="leading-relaxed"
				>
					{truncateDescription(company.description)}
				</Text>
			</Table.Td>
			<Table.Td>
				<Group spacing="xs">
					<Button
						variant="light"
						size="sm"
						color="blue"
						leftSection={<IconEye size={14} />}
						onClick={() =>
							navigate(`/dashboard/company/${company._id["$oid"]}`)
						}
						className="hover:bg-blue-50"
					>
						View
					</Button>
					<Button
						variant="light"
						size="sm"
						color="red"
						leftSection={<IconTrash size={14} />}
						onClick={() => handleDelete(company.id)}
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
						Company Directory
					</Title>
					<Text size="sm" color="dimmed" className="mt-1">
						{companyData.length} companies registered
					</Text>
				</div>
				<Button
					onClick={() => navigate("/dashboard/company/add")}
					variant="filled"
					color="green"
					leftSection={<IconPlus size={16} />}
					className="bg-green-600 hover:bg-green-700 transition-colors"
				>
					Add New Company
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
							<Table.Th
								className="font-semibold text-gray-700 py-4"
								style={{ width: "25%" }}
							>
								Company Name
							</Table.Th>
							<Table.Th className="font-semibold text-gray-700 py-4">
								Description
							</Table.Th>
							<Table.Th
								className="font-semibold text-gray-700 py-4 text-center"
								style={{ width: "15%" }}
							>
								Actions
							</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Card>

			{/* Empty State */}
			{companyData.length === 0 && !loading && (
				<div className="text-center py-12">
					<IconBuilding size={48} className="text-gray-400 mx-auto mb-4" />
					<Title order={4} className="text-gray-600 mb-2">
						No companies found
					</Title>
					<Text size="sm" color="dimmed" className="mb-4">
						Get started by adding your first company
					</Text>
					<Button
						onClick={() => navigate("/dashboard/company/add")}
						variant="filled"
						color="green"
						leftSection={<IconPlus size={16} />}
					>
						Add New Company
					</Button>
				</div>
			)}
		</div>
	);
};
