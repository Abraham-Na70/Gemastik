from agent.question_agent import interview_agent
from flask import jsonify
from agents import Runner

async def generate_questions():
    """
    Generate interview questions based on the applicant's data.
    
    Args:
        data_pelamar (str): The applicant's data in string format.
    
    Returns:
        list: A list of generated interview questions and their rationales.
    """

    data_pelamar = """
    Nama: Reza
    Posisi yang dilamar: Frontend Developer
    Ringkasan: Mahasiswa Teknik Komputer dengan pengalaman membuat dashboard data menggunakan React dan Bootstrap. 
    Sudah pernah mengerjakan beberapa project frontend menggunakan REST API, Vite, dan Tailwind.
    """
    result = await Runner.run(interview_agent, data_pelamar)
    questions = [q.dict() for q in result.final_output.questions]
    return jsonify(questions)