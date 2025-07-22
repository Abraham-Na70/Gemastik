import React, { useMemo } from "react";
import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	Stack,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	IconBriefcase,
	IconArrowRight,
	IconClock,
	IconBuilding,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const DemoJobCard = ({
	title = "Software Engineer",
	description = "Join our team to work on exciting projects and develop innovative solutions.",
	skills = ["HTML", "JavaScript", "React"],
	jobType = "Full-time",
	companyName = "Tech Company",
	companyId = null, // Added company ID for navigation
	location = "Remote",
	imageUrl = "/img/download.png",
	onClick,
	isLoading = false,
	showCompanyLink = true, // Added prop to control company link visibility
	context = "general", // Added context: "general", "dashboard", "admin"
}) => {
	const navigate = useNavigate();

	// Handle company name click based on context
	const handleCompanyClick = (e) => {
		e.stopPropagation(); // Prevent card click event

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

	// Memoized skill color assignment for consistent colors
	const getSkillColor = useMemo(() => {
		const colors = [
			"blue",
			"green",
			"purple",
			"orange",
			"teal",
			"pink",
			"indigo",
		];
		return (index) => colors[index % colors.length];
	}, []);

	// Truncate description for better card layout
	const truncatedDescription = useMemo(() => {
		return description.length > 100
			? `${description.substring(0, 100)}...`
			: description;
	}, [description]);

	return (
		<Card
			shadow="lg"
			padding="lg"
			radius="xl"
			withBorder={false}
			className="h-full flex flex-col bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100"
			style={{
				background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
			}}
		>
			{/* Image Section with Overlay */}
			<Card.Section className="relative overflow-hidden">
				<div className="relative">
					<Image
						src={imageUrl}
						height={180}
						alt="Job Image"
						className="object-cover transition-transform duration-500 hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
					<div className="absolute top-3 right-3">
						<Badge
							color="blue"
							variant="filled"
							size="md"
							className="bg-blue-600/90 backdrop-blur-sm border-0 font-medium shadow-lg"
							leftSection={<IconClock size={14} />}
						>
							{jobType}
						</Badge>
					</div>
				</div>
			</Card.Section>

			{/* Content Section */}
			<Stack spacing="md" className="flex-1 pt-4">
				{/* Title Section */}
				<div className="space-y-3">
					<Group spacing="xs" className="items-center">
						<div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
							<IconBriefcase size={16} className="text-blue-600" />
						</div>
						<Title
							order={4}
							className="text-gray-800 font-semibold leading-tight flex-1"
							lineClamp={2}
						>
							{title}
						</Title>
					</Group>

					{/* Company Information */}
					<Group spacing="xs" className="items-center">
						<IconBuilding size={14} className="text-gray-500" />
						<Text
							size="sm"
							className={`font-medium ${
								companyId && showCompanyLink
									? "text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition-colors"
									: "text-gray-600"
							}`}
							onClick={
								companyId && showCompanyLink ? handleCompanyClick : undefined
							}
							style={{
								cursor: companyId && showCompanyLink ? "pointer" : "default",
							}}
						>
							{companyName}
						</Text>
						{location && (
							<>
								<Text size="xs" className="text-gray-400">
									•
								</Text>
								<Text size="sm" className="text-gray-500">
									{location}
								</Text>
							</>
						)}
					</Group>
				</div>

				{/* Description */}
				<Tooltip label={description} disabled={description.length <= 100}>
					<Text
						size="sm"
						className="text-gray-600 leading-relaxed flex-1"
						style={{ minHeight: "2.5rem" }}
					>
						{truncatedDescription}
					</Text>
				</Tooltip>

				{/* Skills Section */}
				{skills && skills.length > 0 && (
					<div className="space-y-2">
						<Text
							size="xs"
							className="text-gray-500 font-medium uppercase tracking-wide"
						>
							Skills Required
						</Text>
						<Group spacing="xs" className="flex-wrap">
							{skills.slice(0, 4).map((skill, index) => (
								<Badge
									key={index}
									color={getSkillColor(index)}
									variant="light"
									size="sm"
									className="font-medium px-2 py-1"
								>
									{skill}
								</Badge>
							))}
							{skills.length > 4 && (
								<Badge
									color="gray"
									variant="light"
									size="sm"
									className="font-medium px-2 py-1"
								>
									+{skills.length - 4} more
								</Badge>
							)}
						</Group>
					</div>
				)}

				{/* Apply Button */}
				<Button
					color="blue"
					variant="gradient"
					gradient={{ from: "blue", to: "indigo", deg: 45 }}
					fullWidth
					size="md"
					radius="lg"
					onClick={onClick}
					loading={isLoading}
					rightSection={<IconArrowRight size={16} />}
					className="mt-auto font-medium shadow-md hover:shadow-lg transition-all duration-200"
				>
					Apply Now
				</Button>
			</Stack>
		</Card>
	);
};

export default DemoJobCard;
