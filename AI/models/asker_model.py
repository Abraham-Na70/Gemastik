from agent.asker_agent import asker_agent
from flask import jsonify
from agents import Runner

import tools.tools as tools

async def ask_questions(list_pertanyaan, data_ringkasan: str, list_answered_question) -> list:
    """
    Generate interview questions based on the applicant's data.
    
    Args:
        data_pelamar (str): The applicant's data in string format.
    
    Returns:
        list: A list of generated interview questions and their rationales.
    """
    list_pertanyaan_str =tools.list_question_to_string(list_pertanyaan)
    list_answered_question_str = "\n".join(list_answered_question) if list_answered_question else ""
    input_prompt = f"Daftar pertaynyaan yang perlu ditanyakan:\n{list_pertanyaan_str}\n\nRingkasan jawaban pelamar:\n{data_ringkasan}\n\nDaftar pertanyaan yang sudah dijawab:\n{list_answered_question_str}"
   
    result = await Runner.run(asker_agent, input_prompt)
    questions = result.final_output.question
    return questions