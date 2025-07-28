import ChatbotPage from "../components/Chat/ChatBody";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { getInterviewById, getInterviewLogById } from "../api/interview";
import { postChatAi, postVoiceChat } from "../api/ai";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const initializeChat = async () => {
            setInitializing(true);
            setError(null);
            try {
                const data = await getInterviewById(id);
                const response = data.data.status;
                if (response === "in_progress" || response === "finished") {
                    const logData = await getInterviewLogById(id);
                    setMessages(logData);
                } else if (response === "not_started") {
                    setLoading(true);
                    const chatResponse = await postChatAi(id, "");
                    const initialMessage = { message: chatResponse.data, sender: "assistant" };
                    setMessages([initialMessage]);
                    setLoading(false);
                }
            } catch (err) {
                setError("Service is currently unavailable. Please try again later.");
                setLoading(false);
            } finally {
                setInitializing(false);
            }
        };
        if (id) {
            initializeChat();
        }
    }, [id]);

    const handleTextSendMessage = async () => {
        if (inputMessage.trim() === "" || loading) return;
        const userMessage = { id: Date.now(), message: inputMessage, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setLoading(true);
        setError(null);
        try {
            const response = await postChatAi(id, userMessage.message);
            const botResponse = { id: Date.now() + 1, message: response.data, sender: "assistant" };
            setMessages((prev) => [...prev, botResponse]);
        } catch (err) {
            setError("Service is currently unavailable.");
            const errorMessage = { id: Date.now() + 1, message: "Sorry, an error occurred.", sender: "assistant", isError: true };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                audioChunksRef.current = [];
                sendAudioToServer(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToServer = async (audioBlob) => {
        setLoading(true);
        setError(null);
        const thinkingMessage = { id: Date.now(), message: "...", sender: "user"};
        setMessages((prev) => [...prev, thinkingMessage]);
        try {
            const responseBlob = await postVoiceChat(id, audioBlob);
            setMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id));
            const audioUrl = URL.createObjectURL(responseBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (err) {
            setMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id));
            setError("Could not process audio. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRecord = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };


    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Service Unavailable" color="red" variant="filled" style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, maxWidth: "400px", width: "90%" }}>
                    {error}
                </Alert>
            )}
            <ChatbotPage
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleTextSendMessage}
                isLoading={loading}
                initializing={initializing}
                error={error}
                isRecording={isRecording}
                handleRecord={handleRecord}
            />
        </div>
    );
};