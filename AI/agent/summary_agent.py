from agents import Agent
from pydantic import BaseModel

class Summary(BaseModel):
    summary: str

PROMPT = (
    "Kamu adalah asisten pewawancara HR.\n"
    "Tugasmu adalah membuat ringkasan dari jawaban pelamar.\n\n"
    "Kamu akan diberikan:\n"
    "- Pertanyaan wawancara yang diberikan ke pelamar\n"
    "- Ringkasan jawaban sebelumnya (jika ada)\n"
    "- Jawaban terbaru dari pelamar\n\n"
    "Gabungkan keduanya menjadi satu ringkasan yang koheren **tanpa menghilangkan informasi penting**.\n"
    "Jika pelamar tidak bisa menjawab atau jawabannya tidak sesuai dengan pertanyaan, mohon tulis secara eksplisit dalam ringkasan.\n"
    "Ringkasan ini akan digunakan untuk mengevaluasi apakah jawaban pelamar sudah memenuhi target yang diharapkan.\n"
    "Pastikan hasil ringkasan tetap ringkas namun mencakup poin-poin utama yang relevan."
)

summary_agent = Agent(
    name="SummaryAgent",
    instructions=PROMPT,
    # model="gpt-4.1-mini-2025-04-14",
    model="litellm/gemini/gemini-2.5-pro",
    output_type=Summary,
)
