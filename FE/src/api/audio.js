import axios from "axios";

export const TranscribeAudio = async (audioFile) => {
    if (!audioFile) {
        throw new Error("No audio file provided for transcription.");
    }

    const formData = new FormData();
    formData.append("audio", audioFile, "audio.wav");

    try {
        const response = await axios.post(`/ai/transcribe`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.transcript;
    } catch (error) {
        console.error("Error during audio transcription:", error);
        throw error;
    }
};
