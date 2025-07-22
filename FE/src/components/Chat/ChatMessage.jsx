import { Group, Text, Box, Avatar } from "@mantine/core";
import { IconUser, IconRobot, IconAlertTriangle } from "@tabler/icons-react";

export const ChatMessage = ({ message, sender, isError = false }) => {
	const isUser = sender === "user";

	return (
		<Group
			mb="lg"
			style={{
				justifyContent: isUser ? "flex-end" : "flex-start",
				animation: "fadeInUp 0.3s ease-out",
			}}
		>
			{!isUser && (
				<Avatar
					size="sm"
					radius="xl"
					style={{
						background: isError
							? "#fa5252"
							: "linear-gradient(45deg, #667eea, #764ba2)",
						color: "white",
					}}
				>
					{isError ? <IconAlertTriangle size={16} /> : <IconRobot size={16} />}
				</Avatar>
			)}

			<Box
				style={{
					maxWidth: "75%",
					borderRadius: "18px",
					padding: "12px 16px",
					background: isUser
						? "linear-gradient(45deg, #667eea, #764ba2)"
						: isError
						? "linear-gradient(45deg, #fa5252, #e03131)"
						: "#f1f3f4",
					color: isUser || isError ? "white" : "#333",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					position: "relative",
					wordWrap: "break-word",
					animation: "messageSlide 0.3s ease-out",
				}}
			>
				<Text size="sm" style={{ lineHeight: 1.5 }}>
					{message}
				</Text>

				{/* Message tail */}
				<div
					style={{
						position: "absolute",
						bottom: "6px",
						[isUser ? "right" : "left"]: "-6px",
						width: 0,
						height: 0,
						borderLeft: isUser ? "6px solid transparent" : "6px solid #f1f3f4",
						borderRight: isUser ? "6px solid #667eea" : "6px solid transparent",
						borderTop: "6px solid transparent",
						borderBottom: "6px solid transparent",
					}}
				/>
			</Box>

			{isUser && (
				<Avatar
					size="sm"
					radius="xl"
					style={{
						background: "linear-gradient(45deg, #51cf66, #40c057)",
						color: "white",
					}}
				>
					<IconUser size={16} />
				</Avatar>
			)}

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes messageSlide {
					from {
						transform: scale(0.8);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
					}
				}
			`}</style>
		</Group>
	);
};
