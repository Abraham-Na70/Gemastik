from agent.summary_agent import summary_agent
from agents import Runner


async def summarize_answer(previous_summary, data, last_question) -> str:
    """
    Summarize the applicant's answer based on the previous summary and the new answer.

    Args:
        previous_summary (str): The previous summary of the applicant's answers.
        answer (str): The new answer provided by the applicant.

    Returns:
        str: The updated summary of the applicant's answers.
    """
    
    summary = f"Ringkasan sebelumnya: {previous_summary}\n\nJawaban baru: {data} \n\n pertanyaan: {last_question}"

    result = await Runner.run(summary_agent, summary)
    return result.final_output.summary