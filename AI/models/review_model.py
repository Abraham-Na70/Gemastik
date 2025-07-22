from agents import Runner
from flask import jsonify
from agent.review_agent import review_agent
import tools.tools as tools
import json

async def review_summary(list_pertanyaan, list_answered_question, data_ringkasan: str) -> bool:
    
    """
    Review the summary of the applicant's answers based on the interview questions.
    """
    
    # Debug: Print data yang diterima
    # print(f"[DEBUG] list_pertanyaan: {json.dumps(list_pertanyaan, indent=2, ensure_ascii=False)}")
    # print(f"[DEBUG] list_answered_question: {json.dumps(list_answered_question, indent=2, ensure_ascii=False)}")
    # print(f"[DEBUG] data_ringkasan: {data_ringkasan}")
    
    # Validasi data
    if not list_pertanyaan:
        print("[ERROR] list_pertanyaan is empty!")
        return False
        
    if not list_answered_question:
        print("[WARNING] list_answered_question is empty, interview should continue")
        return False
    
    input_prompt = f"""
    Daftar seluruh pertanyaan wawancara (dikelompokkan per kategori):
    {json.dumps(list_pertanyaan, indent=2, ensure_ascii=False)}

    Daftar pertanyaan yang sudah dijawab pelamar:
    {json.dumps(list_answered_question, indent=2, ensure_ascii=False)}

    Ringkasan jawaban pelamar:
    {data_ringkasan}
    """
    
    print(f"[DEBUG] Sending to agent: {input_prompt[:500]}...")

    try:
        result = await Runner.run(review_agent, input_prompt)
        review = result.final_output.is_finish
        print(f"[DEBUG] Agent result: {review}")
        return review
    except Exception as e:
        print(f"[ERROR] Agent failed: {e}")
        return False
