import time
from flask import jsonify, request
from flow.flow import (
    a_generate_questions,
    b_create_summary,
    c_review_summary,
    d_ask_questions
)
import tools.tools as tools

async def chat(id):
    """
    Chat with the applicant based on the interview data.
    
    Args:
        id (str): The ID of the interview.
    
    Returns:
        str: The chat response.
    """
    start_time = time.time()
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided."}), 400

    chat_input = data.get("chat", "")

    # await c_review_summary(id)

    status = tools.get_status_interview(id)

    if status == "finished":
        return jsonify({
            "message": "Interview has already finished.",
            "status": status,
            "data": chat_input
        })

    if status == "not_started":
        await a_generate_questions(id)
        question = await d_ask_questions(id, start_time=start_time)
        return jsonify({
            "message": "Interview started with first question.",
            "status": "in_progress",
            "data": question
        })

    await b_create_summary(id, chat_input)
    await c_review_summary(id)
    is_finish = tools.get_status_interview(id)
    if is_finish == "finished":
        # tools.post_status_interview(id, "finished")
        return jsonify({
            "message": "Interview has finished.",
            "status": "finished123",
            "data": is_finish
        })

    question = await d_ask_questions(id, start_time=start_time)
    return jsonify({
        "message": "Interview is in progress.",
        "status": "in_progress",
        "data": question
    })
