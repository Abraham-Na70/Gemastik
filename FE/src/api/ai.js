import axios from "axios";

export const postChatAi = async (id, chat) => {
    try {
        const response = await axios.post(`/ai/chat/${id}`, {
            chat: chat,
        });
        return response.data;
    } catch (error) {
        console.error("Error posting chat to AI:", error);
        throw error;
    }
};

export const postVoiceChat = async (id, audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "user_audio.wav");

    try {
        const response = await axios.post(`/ai/voice/chat/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob", 
        });
        return response.data; 
    } catch (error) {
        console.error("Error posting voice chat to AI:", error);
        throw error;
    }
};