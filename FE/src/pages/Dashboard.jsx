import {
	Container,
	Tabs,
	Card,
	Title,
	Group,
	Badge,
	Skeleton,
} from "@mantine/core";
import { lazy, Suspense } from "react";
import {
	IconBriefcase,
	IconBuilding,
	IconUsers,
	IconTrendingUp,
} from "@tabler/icons-react";

// Lazy load komponen tabel untuk performa lebih baik
const JobTable = lazy(() =>
	import("../components/Jobs/JobTable").then((module) => ({
		default: module.JobTable,
	}))
);
const CompanyTable = lazy(() =>
	import("../components/Company/CompanyTable").then((module) => ({
		default: module.CompanyTable,
	}))
);

// Loading component untuk tabel
const TableSkeleton = () => (
	<div className="space-y-4">
		<Skeleton height={20} />
		<Skeleton height={20} />
		<Skeleton height={20} />
		<Skeleton height={20} />
		<Skeleton height={20} />
	</div>
);

export const Dashboard = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Container size="xl" className="py-8">
				{/* Header Section */}
				<div className="mb-8">
					<Title order={1} className="text-4xl font-bold text-gray-800 mb-2">
						Dashboard
					</Title>
					<p className="text-lg text-gray-600">
						Manage your jobs and companies efficiently
					</p>
				</div>

				{/* Stats Cards - Simplified untuk performa */}
				{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
						<Group className="items-center justify-between">
							<div>
								<Title order={3} className="text-2xl font-bold">
									156
								</Title>
								<p className="text-blue-100">Total Jobs</p>
							</div>
							<IconBriefcase size={40} className="text-blue-200" />
						</Group>
					</Card>

					<Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
						<Group className="items-center justify-between">
							<div>
								<Title order={3} className="text-2xl font-bold">
									42
								</Title>
								<p className="text-green-100">Companies</p>
							</div>
							<IconBuilding size={40} className="text-green-200" />
						</Group>
					</Card>

					<Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
						<Group className="items-center justify-between">
							<div>
								<Title order={3} className="text-2xl font-bold">
									1,234
								</Title>
								<p className="text-purple-100">Applications</p>
							</div>
							<IconUsers size={40} className="text-purple-200" />
						</Group>
					</Card>

					<Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
						<Group className="items-center justify-between">
							<div>
								<Title order={3} className="text-2xl font-bold">
									89%
								</Title>
								<p className="text-orange-100">Success Rate</p>
							</div>
							<IconTrendingUp size={40} className="text-orange-200" />
						</Group>
					</Card>
				</div> */}

				{/* Main Content */}
				<Card className="bg-white shadow-xl rounded-xl border-0 overflow-hidden">
					<Tabs defaultValue="jobs" variant="pills" className="w-full">
						<div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
							<Tabs.List className="bg-white rounded-lg p-1 shadow-sm">
								<Tabs.Tab
									value="jobs"
									className="px-6 py-3 font-semibold text-gray-700 hover:text-blue-600 data-[active]:bg-blue-600 data-[active]:text-white data-[active]:shadow-md transition-all duration-200"
								>
									<Group spacing="xs">
										<IconBriefcase size={18} />
										<span>Jobs Management</span>
									</Group>
								</Tabs.Tab>
								<Tabs.Tab
									value="companies"
									className="px-6 py-3 font-semibold text-gray-700 hover:text-green-600 data-[active]:bg-green-600 data-[active]:text-white data-[active]:shadow-md transition-all duration-200"
								>
									<Group spacing="xs">
										<IconBuilding size={18} />
										<span>Companies Management</span>
									</Group>
								</Tabs.Tab>
							</Tabs.List>
						</div>

						<Tabs.Panel value="jobs" className="p-6">
							<div className="space-y-4">
								{/* <Group className="items-center justify-between">
									<div>
										<Title
											order={2}
											className="text-xl font-semibold text-gray-800"
										>
											Job Listings
										</Title>
										<p className="text-gray-600">
											Manage and track all job postings
										</p>
									</div>
									<Badge
										variant="light"
										color="blue"
										size="lg"
										className="px-3 py-2"
									>
										Active Jobs
									</Badge>
								</Group> */}
								<div className="bg-white rounded-lg">
									<Suspense fallback={<TableSkeleton />}>
										<JobTable />
									</Suspense>
								</div>
							</div>
						</Tabs.Panel>

						<Tabs.Panel value="companies" className="p-6">
							<div className="space-y-4">
								{/* <Group className="items-center justify-between">
									<div>
										<Title
											order={2}
											className="text-xl font-semibold text-gray-800"
										>
											Company Directory
										</Title>
										<p className="text-gray-600">
											Manage partner companies and organizations
										</p>
									</div>
									<Badge
										variant="light"
										color="green"
										size="lg"
										className="px-3 py-2"
									>
										Active Partners
									</Badge>
								</Group> */}
								<div className="bg-white rounded-lg">
									<Suspense fallback={<TableSkeleton />}>
										<CompanyTable />
									</Suspense>
								</div>
							</div>
						</Tabs.Panel>
					</Tabs>
				</Card>
			</Container>
		</div>
	);
};
