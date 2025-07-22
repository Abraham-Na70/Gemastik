import {
	Card,
	Title,
	Text,
	Group,
	Button,
	Stack,
	Container,
	Divider,
	Badge,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconEdit, IconBuilding } from "@tabler/icons-react";

export const CompanyCardView = ({
	companyTitle,
	companyDesc,
	onEdit,
	onBack,
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			navigate("/dashboard");
		}
	};

	return (
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
						{/* Header Section */}
						<div className="text-center space-y-4">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
								<IconBuilding size={32} className="text-green-600" />
							</div>
							<Title
								order={1}
								className="text-3xl font-bold text-gray-800 leading-tight"
							>
								{companyTitle}
							</Title>
							<Badge
								color="green"
								variant="light"
								size="lg"
								className="font-medium"
							>
								Company Profile
							</Badge>
						</div>

						<Divider />

						{/* Description Section */}
						<div className="space-y-3">
							<Title order={4} className="text-lg font-semibold text-gray-700">
								About Company
							</Title>
							<Text
								size="md"
								className="text-gray-600 leading-relaxed"
								style={{ whiteSpace: "pre-wrap" }}
							>
								{companyDesc}
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
								color="green"
								size="md"
								leftSection={<IconEdit size={16} />}
								onClick={onEdit}
								className="bg-green-600 hover:bg-green-700 transition-colors"
							>
								Edit Company
							</Button>
						</Group>
					</Stack>
				</Card>
			</Container>
		</div>
	);
};
