import {
	Card,
	Stack,
	Title,
	Group,
	Button,
	TextInput,
	Textarea,
	MultiSelect,
	Container,
	Divider,
	Text,
	Select,
	Alert,
	Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getCompanies } from "../../api/company";
import {
	IconBriefcase,
	IconCheck,
	IconX,
	IconBuilding,
	IconFileText,
	IconTags,
	IconAlertCircle,
} from "@tabler/icons-react";

export const JobCardEditForm = ({
	jobTitle = "",
	JobDesc = "",
	JobSkills = [],
	CompanyId = "",
	onSave,
	onCancel,
	isEdit = true,
	isLoading = false,
}) => {
	const [title, setTitle] = useState(jobTitle);
	const [desc, setDesc] = useState(JobDesc);
	const [skills, setSkills] = useState(JobSkills || []);
	const [companyOptions, setCompanyOptions] = useState([]);
	const [companyId, setCompanyId] = useState(CompanyId);
	const [loadingCompanies, setLoadingCompanies] = useState(false);
	const [error, setError] = useState(null);

	// Predefined skill options for MultiSelect
	const skillOptions = [
		"JavaScript",
		"TypeScript",
		"React",
		"Vue.js",
		"Angular",
		"Node.js",
		"Python",
		"Java",
		"C#",
		"PHP",
		"Go",
		"Rust",
		"HTML",
		"CSS",
		"SASS",
		"Tailwind CSS",
		"Bootstrap",
		"MongoDB",
		"PostgreSQL",
		"MySQL",
		"Redis",
		"Docker",
		"Kubernetes",
		"AWS",
		"Azure",
		"Git",
		"CI/CD",
		"Testing",
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);

		if (!title.trim() || !desc.trim() || !companyId) {
			setError("Please fill in all required fields");
			return;
		}

		if (onSave) {
			const data = {
				title: title.trim(),
				description: desc.trim(),
				skills: skills,
				company_id: companyId,
			};
			onSave(data);
		}
	};

	useEffect(() => {
		const fetchCompanies = async () => {
			setLoadingCompanies(true);
			setError(null);

			try {
				const data = await getCompanies();
				const companies = data.data.map((company) => ({
					value: company._id,
					label: company.name,
				}));
				setCompanyOptions(companies);
				console.log("Companies fetched:", companies);
			} catch (error) {
				console.error("Error fetching companies:", error);
				setError("Failed to load companies");
			} finally {
				setLoadingCompanies(false);
			}
		};

		fetchCompanies();
	}, []);

	// const handleCreateSkill = (query) => {
	// 	setSkillOptions((current) => [...current, query]);
	// 	setSkills((current) => [...current, query]);
	// 	return query;
	// };

	return (
		<div
			style={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				minHeight: "100vh",
				padding: "2rem",
			}}
		>
			<Container size="md">
				<Card
					shadow="xl"
					padding="xl"
					radius="lg"
					style={{
						background: "rgba(255, 255, 255, 0.95)",
						backdropFilter: "blur(10px)",
						border: "1px solid rgba(255, 255, 255, 0.3)",
					}}
				>
					<Stack spacing="md">
						<Group spacing="sm" mb="md" style={{ justifyContent: "center" }}>
							<IconBriefcase size={28} color="#667eea" />
							<Title
								order={2}
								style={{
									background: "linear-gradient(45deg, #667eea, #764ba2)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
									textAlign: "center",
								}}
							>
								{isEdit ? "Edit Job" : "Add New Job"}
							</Title>
						</Group>

						{error && (
							<Alert
								icon={<IconAlertCircle size={16} />}
								title="Error"
								color="red"
								variant="filled"
								mb="lg"
							>
								{error}
							</Alert>
						)}

						{isLoading && (
							<div style={{ textAlign: "center", padding: "2rem" }}>
								<Loader size="lg" color="#667eea" />
								<Text mt="sm" color="dimmed">
									Loading...
								</Text>
							</div>
						)}

						{!isLoading && (
							<form onSubmit={handleSubmit}>
								<Stack spacing="md">
									<TextInput
										label="Job Title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
										icon={<IconFileText size={16} />}
									/>

									<Textarea
										label="Job Description"
										value={desc}
										onChange={(e) => setDesc(e.target.value)}
										required
										autosize
										minRows={5}
										maxRows={10}
										icon={<IconFileText size={16} />}
									/>

									<MultiSelect
										label="Job Skills"
										data={skillOptions}
										value={skills}
										onChange={setSkills}
										placeholder="Select or type skills"
										searchable
										creatable
										getCreateLabel={(query) => `+ Create ${query}`}
										onCreate={(query) => {
											const item = query;
											setSkills((current) => [...current, item]);
											return item;
										}}
										icon={<IconTags size={16} />}
									/>

									<Select
										label="Company"
										data={companyOptions}
										value={companyId}
										onChange={(value) => {
											console.log("Selected company:", value);
											setCompanyId(value);
										}}
										required
										placeholder="Select a company"
										disabled={loadingCompanies}
										searchable
										clearable
										error={error}
										icon={<IconBuilding size={16} />}
									/>

									<Group mt="xl" style={{ justifyContent: "center" }}>
										<Button
											variant="outline"
											color="red"
											onClick={onCancel}
											leftIcon={<IconX size={16} />}
											size="md"
										>
											Cancel
										</Button>
										<Button
											type="submit"
											variant="filled"
											style={{
												background: "linear-gradient(45deg, #667eea, #764ba2)",
												border: "none",
											}}
											leftIcon={<IconCheck size={16} />}
											size="md"
										>
											Save Changes
										</Button>
									</Group>
								</Stack>
							</form>
						)}
					</Stack>
				</Card>
			</Container>
		</div>
	);
};
