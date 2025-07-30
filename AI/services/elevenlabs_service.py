import os
import requests
from elevenlabs.client import ElevenLabs

# --- Configuration ---
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
DEFAULT_VOICE_ID = "9BWtsMINqrJLrRacOk9x"
STT_API_URL = "https://api.elevenlabs.io/v1/speech-to-text"

# --- Initialize Client (for TTS) ---
if not ELEVENLABS_API_KEY:
    raise ValueError("ELEVENLABS_API_KEY is not set in the .env file.")
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)


def text_to_speech(text_to_speak: str, voice_id: str = DEFAULT_VOICE_ID) -> bytes:
    """
    Converts text to speech, ensuring a complete bytes object is returned.
    """
    try:
        audio = client.generate(
            text=text_to_speak,
            voice=voice_id,
            model="eleven_multilingual_v2",
            stream=False 
        )
        return audio
    except Exception as e:
        print(f"Error during Text-to-Speech generation: {e}")
        raise


def speech_to_text(audio_file) -> str:
    """
    Converts speech to text using a direct HTTP request.
    """
    try:
        headers = {
            "xi-api-key": ELEVENLABS_API_KEY
        }
        
        data = {
            "model_id": "scribe_v1" 
        }
        
        files = {
            "file": audio_file
        }
        
        response = requests.post(STT_API_URL, headers=headers, data=data, files=files)
        
        response.raise_for_status() 
        
        response_json = response.json()
        return response_json.get("text", "")

    except Exception as e:
        print(f"Error during direct STT API call: {e}")
        if 'response' in locals():
            print(f"Response content: {response.text}")
        raise