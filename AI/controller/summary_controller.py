from agent.summary_agent import summary_agent
from agents import Runner
from flask import request

async def summarize_answer() -> str:
    """
    Summarize the applicant's answer based on the previous summary and the new answer.

    Args:
        previous_summary (str): The previous summary of the applicant's answers.
        answer (str): The new answer provided by the applicant.

    Returns:
        str: The updated summary of the applicant's answers.
    """
    data = request.get_json()
    previous_summary = data.get("previous_summary", "")
    answer = data.get("answer", "")
    if  not answer.strip():
        return "Previous summary and answer are required."
    # return data

    summary = f"Ringkasan sebelumnya: {previous_summary}\n\nJawaban baru: {answer}"

    result = await Runner.run(summary_agent, summary)
    return result.final_output.summary