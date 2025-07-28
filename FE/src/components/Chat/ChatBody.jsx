import React, { useRef, useEffect } from "react";
import {
    Container,
    Paper,
    TextInput,
    Group,
    ScrollArea,
    Title,
    Loader,
    Text,
    Box,
    ActionIcon,
    Skeleton,
} from "@mantine/core";
// Import the new icons
import { IconSend, IconMicrophone, IconPlayerStopFilled, IconRobot, IconMessageCircle } from "@tabler/icons-react";
import { ChatMessage } from "./ChatMessage";

const ChatbotPage = ({
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isLoading = false,
    initializing = false,
    error = null,
    // Add these new props for recording
    isRecording = false,
    handleRecord,
}) => {
    const viewport = useRef(null);

    const scrollToBottom = () => {
        if (viewport.current) {
            viewport.current.scrollTo({
                top: viewport.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isRecording) { // Prevent send on enter while recording
            handleSendMessage();
        }
    };

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                height: "100vh",
                padding: "0.5rem",
                overflow: "hidden",
            }}
        >
            <Container
                size="md"
                style={{
                    height: "calc(100vh - 1rem)",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                }}
            >
                <Paper
                    shadow="xl"
                    radius="xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}
                    <Box
                        p="lg"
                        style={{
                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                            borderRadius: "16px 16px 0 0",
                            color: "white",
                        }}
                    >
                        <Group spacing="sm" style={{ justifyContent: "center" }}>
                            <IconRobot size={28} />
                            <Title order={2} style={{ margin: 0 }}>
                                AI Interview Assistant
                            </Title>
                        </Group>
                        <Text
                            size="sm"
                            style={{ textAlign: "center", opacity: 0.9, marginTop: "0.5rem" }}
                        >
                            Simulasi wawancara kerja dengan AI
                        </Text>
                    </Box>

                    {/* Chat Messages Area */}
                    <ScrollArea
                        style={{ flex: 1, padding: "1rem" }}
                        viewportRef={viewport}
                        scrollHideDelay={0}
                    >
                        {initializing ? (
                             <div style={{ padding: "2rem", textAlign: "center" }}>
                                <Loader size="lg" color="#667eea" />
                                <Text mt="md" color="dimmed">
                                    Mempersiapkan sesi wawancara...
                                </Text>
                                <Box mt="lg">
                                    <Skeleton height={60} radius="lg" mb="md" />
                                    <Skeleton height={60} radius="lg" mb="md" />
                                    <Skeleton height={60} radius="lg" />
                                </Box>
                            </div>
                        ) : messages.length === 0 ? (
                            <div
                                style={{
                                    padding: "3rem",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <IconMessageCircle
                                    size={64}
                                    color="#667eea"
                                    style={{ opacity: 0.5 }}
                                />
                                <Text size="lg" color="dimmed" mt="md">
                                    Belum ada pesan
                                </Text>
                                <Text size="sm" color="dimmed" mt="xs">
                                    Mulai percakapan dengan AI assistant
                                </Text>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, index) => (
                                    <ChatMessage
                                        key={msg.id || index}
                                        message={msg.message}
                                        sender={msg.sender}
                                        isError={msg.isError}
                                    />
                                ))}

                                {/* Typing indicator */}
                                {isLoading && !isRecording && (
                                    <Group mb="md" style={{ justifyContent: "flex-start" }}>
                                        <Box
                                            style={{
                                                background: "#f1f3f4",
                                                borderRadius: "18px",
                                                padding: "12px 16px",
                                                maxWidth: "80px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}
                                        >
                                            <div className="typing-animation">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </Box>
                                    </Group>
                                )}
                            </>
                        )}
                    </ScrollArea>

                    {/* Input Area */}
                    <Box p="lg" style={{ borderTop: "1px solid #e9ecef" }}>
                        <Group spacing="xs" wrap="nowrap">
                            <TextInput
                                placeholder={
                                    isRecording ? "Recording... Click stop when done." :
                                    isLoading ? "AI is processing..." : "Ketik pesan Anda..."
                                }
                                value={inputMessage}
                                onChange={(event) => setInputMessage(event.currentTarget.value)}
                                onKeyPress={handleKeyPress}
                                style={{ flex: 1 }}
                                size="md"
                                radius="xl"
                                disabled={isLoading || initializing || error || isRecording}
                                styles={{
                                    input: {
                                        background: "rgba(255, 255, 255, 0.8)",
                                        border: "1px solid rgba(103, 126, 234, 0.3)",
                                        "&:focus": {
                                            borderColor: "#667eea",
                                        },
                                    },
                                }}
                            />
                            {/* --- THIS IS THE NEW PART --- */}
                            <ActionIcon
                                onClick={handleRecord}
                                size="lg"
                                radius="xl"
                                disabled={isLoading || initializing || error}
                                color={isRecording ? "red" : "blue"}
                                variant="filled"
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                {isRecording ? <IconPlayerStopFilled size={20} /> : <IconMicrophone size={20} />}
                            </ActionIcon>
                            {/* --- END OF NEW PART --- */}
                            <ActionIcon
                                onClick={handleSendMessage}
                                size="lg"
                                radius="xl"
                                disabled={
                                    isLoading || initializing || error || !inputMessage.trim() || isRecording
                                }
                                style={{
                                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                                    color: "white",
                                    width: "48px",
                                    height: "48px",
                                }}
                            >
                                {isLoading ? (
                                    <Loader size="sm" color="white" />
                                ) : (
                                    <IconSend size={20} />
                                )}
                            </ActionIcon>
                        </Group>
                    </Box>
                </Paper>
            </Container>

            <style jsx>{`
                .typing-animation {
                    display: flex;
                    gap: 2px;
                }
                .typing-animation span {
                    width: 6px;
                    height: 6px;
                    background: #667eea;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out;
                }
                .typing-animation span:nth-child(1) {
                    animation-delay: -0.32s;
                }
                .typing-animation span:nth-child(2) {
                    animation-delay: -0.16s;
                }
                @keyframes typing {
                    0%,
                    80%,
                    100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default ChatbotPage;
