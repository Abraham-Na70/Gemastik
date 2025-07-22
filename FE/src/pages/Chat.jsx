import ChatbotPage from "../components/Chat/ChatBody";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import { getInterviewById, getInterviewLogById } from "../api/interview";
import { postChatAi } from "../api/ai";

export const Chat = () => {
	const [messages, setMessages] = useState([]); // Remove dummy data
	const [inputMessage, setInputMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [init, setInit] = useState(false);
	const [error, setError] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const initializeChat = async () => {
			setInitializing(true);
			setError(null);

			try {
				const data = await getInterviewById(id);
				const response = data.data.status;
				console.log("status interview:", response);

				if (response === "in_progress" || response === "finished") {
					console.log("Interview ongoing, fetching messages...");
					const logData = await getInterviewLogById(id);
					console.log("Fetched interview log:", logData);
					setMessages(logData);
				} else if (response === "not_started" && !init) {
					console.log("Interview not started, initializing...");
					setInit(true);
					setLoading(true);

					const chatResponse = await postChatAi(id, "");
					console.log("Chat AI response:", chatResponse.data);
					const initialMessage = {
						message: chatResponse.data,
						sender: "bot",
					};
					setMessages([initialMessage]);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error initializing chat:", error);
				setError("Layanan ini sedang tidak aktif. Silakan coba lagi nanti.");
				setLoading(false);
			} finally {
				setInitializing(false);
			}
		};

		if (id) {
			initializeChat();
		}
	}, [id, init]);

	const handleSendMessage = async () => {
		if (inputMessage.trim() === "" || loading) return;

		const userMessage = inputMessage.trim();
		const newUserMessage = {
			id: Date.now(),
			message: userMessage,
			sender: "user",
		};

		setMessages((prev) => [...prev, newUserMessage]);
		setInputMessage("");
		setLoading(true);
		setError(null);

		try {
			const response = await postChatAi(id, userMessage);
			console.log("Chat AI response:", response.data);

			const botResponse = {
				id: Date.now() + 1,
				message: response.data,
				sender: "bot",
			};

			setMessages((prev) => [...prev, botResponse]);
		} catch (error) {
			console.error("Error sending message to AI:", error);
			setError("Layanan ini sedang tidak aktif. Silakan coba lagi nanti.");

			// Add error message to chat
			const errorMessage = {
				id: Date.now() + 1,
				message: "Maaf, terjadi kesalahan. Layanan chat sedang tidak tersedia.",
				sender: "bot",
				isError: true,
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			{error && (
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Layanan Tidak Tersedia"
					color="red"
					variant="filled"
					style={{
						position: "fixed",
						top: "20px",
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: 9999,
						maxWidth: "400px",
						width: "90%",
					}}
				>
					{error}
				</Alert>
			)}

			<ChatbotPage
				messages={messages}
				inputMessage={inputMessage}
				setInputMessage={setInputMessage}
				handleSendMessage={handleSendMessage}
				isLoading={loading}
				initializing={initializing}
				error={error}
			/>
		</div>
	);
};
