import asyncio
from flask import request, Response
from services import elevenlabs_service
from flow.flow import b_create_summary, c_review_summary, d_ask_questions
from tools import tools

def handle_voice_chat(id: str):
    """
    This is the synchronous wrapper that runs the async logic.
    """
    return asyncio.run(async_handle_voice_chat(id))

async def async_handle_voice_chat(id: str):
    """
    Handles a full voice chat turn and returns the raw audio response.
    """
    if 'audio' not in request.files:
        return {"error": "No audio file provided"}, 400

    audio_file = request.files['audio']

    try:
        user_text = elevenlabs_service.speech_to_text(audio_file)
        
        if not user_text.strip():
            error_text = "I'm sorry, I couldn't hear you clearly. Could you say that again?"
            error_audio = elevenlabs_service.text_to_speech(error_text)
            return Response(error_audio, mimetype="audio/mpeg")

        await b_create_summary(id, user_text)
        await c_review_summary(id)
        
        is_finish = tools.get_status_interview(id)
        if is_finish == "finished":
            ai_response_text = "Thank you. This concludes the interview."
        else:
            ai_response_text = await d_ask_questions(id, start_time=0)
        
        ai_audio_response_bytes = elevenlabs_service.text_to_speech(ai_response_text)
        
        return Response(ai_audio_response_bytes, mimetype="audio/mpeg")

    except Exception as e:
        print(f"Error in voice controller: {e}")
        return {"error": "A server error occurred"}, 500