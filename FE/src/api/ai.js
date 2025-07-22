import axios from "axios";

export const postChatAi = async (id, chat) => {
    try {
        const response = await axios.post(`/ai/chat/${id}`, {
            chat: chat,
        });
        console.log("Chat posted to AI successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error posting chat to AI:", error);
        throw error;
    }
};
