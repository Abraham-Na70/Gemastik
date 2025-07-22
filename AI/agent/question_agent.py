from pydantic import BaseModel
from typing import List, Dict
from agents import Agent

class QuestionItem(BaseModel):
    id: int
    question: str

class InterviewCategory(BaseModel):
    category_name: str
    questions: List[QuestionItem]

class InterviewQuestionList(BaseModel):
    categories: List[InterviewCategory]

PROMPT = (
    "Kamu adalah asisten pewawancara HR. Berdasarkan data pelamar yang diberikan, buatlah "
    "daftar pertanyaan wawancara yang relevan dengan posisi pekerjaan yang dilamar. "
    "Selalu menggunakan bahasa Indonesia. "
    "Input yang kamu terima terdiri dari: deskripsi pekerjaan dan skill yang dibutuhkan, nama perusahaan, dan deskripsi perusahaan\n"
    "Berdasarkan deskripsi pekerjaan berikut, buatlah daftar pertanyaan wawancara yang merata dalam kategori:\n"
    "- Keterampilan Teknis\n"
    "- Soft Skills\n"
    "- Kerjasama Tim\n"
    "- Motivasi & Tujuan\n"
    "- Kesesuaian Budaya Kerja\n"
    "- Pemahaman Tentang Perusahaan\n"
    "Mohon berikan 2-3 pertanyaan untuk masing-masing kategori, dengan memastikan distribusi yang seimbang. "
    "Format output harus berupa JSON dengan struktur berikut:\n"
    "{\n"
    "  \"Technical Skills\": [\n"
    "    {\"id\": 1, \"question\": \"Pertanyaan teknis 1\"},\n"
    "    {\"id\": 2, \"question\": \"Pertanyaan teknis 2\"}\n"
    "  ],\n"
    "  \"Soft Skills\": [\n"
    "    {\"id\": 1, \"question\": \"Pertanyaan soft skill 1\"},\n"
    "    {\"id\": 2, \"question\": \"Pertanyaan soft skill 2\"}\n"
    "  ],\n"
    "  ...\n"
    "}"
)

interview_agent = Agent(
    name="InterviewQuestionAgent",
    instructions=PROMPT,
    # model="gpt-4.1-mini-2025-04-14",
    model="litellm/gemini/gemini-2.5-pro",
    output_type=InterviewQuestionList,
)