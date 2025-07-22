from agents import Runner
from flask import jsonify
from agent.review_agent import review_agent

async def review_summary():
    
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
    data_ringkasan = "Reza memiliki pengalaman membangun dashboard menggunakan React dan Bootstrap dengan fokus pada tampilan responsif. Ia juga menyukai penggunaan Tailwind karena mempercepat proses styling dan membuat tampilan lebih konsisten."

    list_pertanyaan_str = "\n".join(
        [f"Q: {q['question']}\nA: {q['rationale']}" for q in list_pertanyaan]
    )

    input_prompt = f"{list_pertanyaan_str}\n\nRingkasan jawaban pelamar:\n{data_ringkasan}"

    result = await Runner.run(review_agent, input_prompt)
    review = result.final_output.is_finish
    return jsonify(review)
