from agent.asker_agent import asker_agent
from flask import jsonify
from agents import Runner

async def ask_questions():
    """
    Generate interview questions based on the applicant's data.
    
    Args:
        data_pelamar (str): The applicant's data in string format.
    
    Returns:
        list: A list of generated interview questions and their rationales.
    """

    list_pertanyaan = [
        {
            "question": "Bisakah Anda ceritakan pengalaman Anda dalam membuat dashboard data menggunakan React dan Bootstrap?",
            "rationale": "Pertanyaan ini bertujuan untuk memahami pengalaman langsung Reza dalam menggunakan teknologi yang relevan dengan posisi yang dilamar, serta memahami kemampuan dan kedalaman pengalamannya di bidang front-end."
        },
        {
            "question": "Bagaimana Anda mengatasi tantangan ketika berintegrasi dengan REST API dalam proyek-proyek Anda?",
            "rationale": "Pertanyaan ini untuk menilai kemampuan masalah dan pengalaman Reza dalam mengelola komunikasi antara frontend dan backend, yang penting dalam pengembangan aplikasi modern."
        },
        {
            "question": "Apa yang membuat Anda tertarik untuk bergabung sebagai Frontend Developer di perusahaan kami?",
            "rationale": "Pertanyaan ini membantu menilai motivasi dan kecocokan Reza dengan perusahaan serta posisi yang dilamar."
        },
        {
            "question": "Apa fitur atau aspek dari Vite dan Tailwind yang menurut Anda paling membantu dalam pengembangan frontend?",
            "rationale": "Pertanyaan ini untuk memahami pengetahuan Reza tentang alat yang digunakannya dan bagaimana dia memanfaatkannya untuk meningkatkan produktivitas dan kualitas kerjanya."
        }
    ]
    data_ringkasan = "Reza memiliki pengalaman membangun dashboard data menggunakan React dan Bootstrap, terutama untuk menampilkan data yang dinamis dan responsif. Dalam proses tersebut, ia terbiasa menangani integrasi REST API dengan menangani error handling dan loading state secara efisien. Reza tertarik bergabung sebagai Frontend Developer di perusahaan karena tertarik dengan budaya kolaboratif dan proyek-proyek berdampak yang perusahaan jalankan. Ia merasa Vite sangat membantu karena waktu build yang cepat dan dukungan modul modern, sementara Tailwind mempermudah styling yang konsisten tanpa harus banyak menulis CSS manual."

    list_pertanyaan_str = "\n".join(
        [f"Q: {q['question']}\nA: {q['rationale']}" for q in list_pertanyaan]
    )
    input_prompt = f"{list_pertanyaan_str}\n\nRingkasan jawaban pelamar:\n{data_ringkasan}"
   
    result = await Runner.run(asker_agent, input_prompt)
    questions = result.final_output.question
    return jsonify(questions)