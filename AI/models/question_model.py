from agent.question_agent import interview_agent
from flask import jsonify
from agents import Runner

async def generate_questions(data_pelamar: str) -> list:
    """
    Generate interview questions based on the applicant's data.
    
    Args:
        data_pelamar (str): The applicant's data in string format.
    
    Returns:
        list: A list of generated interview questions and their rationales.
    """

    result = await Runner.run(interview_agent, data_pelamar)
    questions = [q.dict() for q in result.final_output.categories]
    return questions