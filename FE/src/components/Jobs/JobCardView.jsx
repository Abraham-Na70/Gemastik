import {
	Card,
	Container,
	Stack,
	Title,
	Text,
	Group,
	Button,
	Badge,
	Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
	IconArrowLeft,
	IconEdit,
	IconSend,
	IconBriefcase,
	IconBuilding,
	IconMapPin,
} from "@tabler/icons-react";

export const JobCardView = ({
	jobTitle,
	JobDesc,
	JobSkills = [],
	companyName = "Company",
	companyId = null, // Added company ID for navigation
	location = "Remote",
	onEdit,
	onBack,
	isApply = false,
	showCompanyLink = true, // Added prop to control company link visibility
	context = "general", // Added context: "general", "dashboard", "admin"
}) => {
	const navigate = useNavigate();

	// Handle company name click based on context
	const handleCompanyClick = () => {
		if (!companyId || !showCompanyLink) return;

		// Navigate based on context
		if (context === "dashboard" || context === "admin") {
			// For dashboard/admin context, navigate to company view
			navigate(`/company/${companyId}`);
		} else {
			// For general context, could show company info modal or navigate
			navigate(`/company/${companyId}`);
		}
	};

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			navigate("/dashboard");
		}
	};

	const getSkillColor = (index) => {
		const colors = [
			"blue",
			"green",
			"purple",
			"orange",
			"teal",
			"pink",
			"indigo",
		];
		return colors[index % colors.length];
	};

	return (
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
						{/* Header Section */}
						<div className="text-center space-y-4">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
								<IconBriefcase size={32} className="text-blue-600" />
							</div>
							<Title
								order={1}
								className="text-3xl font-bold text-gray-800 leading-tight"
							>
								{jobTitle}
							</Title>

							{/* Company Information */}
							<div className="flex items-center justify-center space-x-4 text-gray-600">
								<div className="flex items-center space-x-2">
									<IconBuilding size={18} className="text-blue-500" />
									<Text
										size="lg"
										className={`font-medium ${
											companyId && showCompanyLink
												? "text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition-colors"
												: "text-gray-700"
										}`}
										onClick={
											companyId && showCompanyLink
												? handleCompanyClick
												: undefined
										}
										style={{
											cursor:
												companyId && showCompanyLink ? "pointer" : "default",
										}}
									>
										{companyName}
									</Text>
								</div>
								{location && (
									<>
										<Text size="sm" className="text-gray-400">
											•
										</Text>
										<div className="flex items-center space-x-1">
											<IconMapPin size={16} className="text-green-500" />
											<Text size="md" className="text-gray-600">
												{location}
											</Text>
										</div>
									</>
								)}
							</div>
						</div>

						<Divider />

						{/* Skills Section */}
						{JobSkills && JobSkills.length > 0 && (
							<div className="space-y-3">
								<Title
									order={4}
									className="text-lg font-semibold text-gray-700"
								>
									Required Skills
								</Title>
								<Group spacing="sm" className="flex flex-wrap">
									{JobSkills.map((skill, index) => (
										<Badge
											key={index}
											color={getSkillColor(index)}
											variant="light"
											size="lg"
											className="px-3 py-2 font-medium text-sm"
										>
											{skill}
										</Badge>
									))}
								</Group>
							</div>
						)}

						<Divider />

						{/* Description Section */}
						<div className="space-y-3">
							<Title order={4} className="text-lg font-semibold text-gray-700">
								Job Description
							</Title>
							<Text
								size="md"
								className="text-gray-600 leading-relaxed"
								style={{ whiteSpace: "pre-wrap" }}
							>
								{JobDesc}
							</Text>
						</div>

						<Divider />

						{/* Action Buttons */}
						<Group className="flex justify-between items-center pt-4">
							<Button
								variant="light"
								color="gray"
								size="md"
								leftSection={<IconArrowLeft size={16} />}
								onClick={handleBack}
								className="hover:bg-gray-100 transition-colors"
							>
								Back to Dashboard
							</Button>
							<Button
								variant="filled"
								color={isApply ? "green" : "blue"}
								size="md"
								leftSection={
									isApply ? <IconSend size={16} /> : <IconEdit size={16} />
								}
								onClick={onEdit}
								className={`transition-colors ${
									isApply
										? "bg-green-600 hover:bg-green-700"
										: "bg-blue-600 hover:bg-blue-700"
								}`}
							>
								{isApply ? "Apply Now" : "Edit Job"}
							</Button>
						</Group>
					</Stack>
				</Card>
			</Container>
		</div>
	);
};
