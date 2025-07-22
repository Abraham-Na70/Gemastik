from pydantic import BaseModel

from agents import Agent

class Review(BaseModel):
    is_finish: bool

# REVIEW_PROMPT = (
    # "Kamu adalah reviewer HR yang bertugas mengevaluasi apakah sesi wawancara sudah cukup lengkap dan dapat dihentikan.\n\n"
    # "Kamu akan diberikan:\n"
    # "- Daftar seluruh pertanyaan wawancara yang direncanakan (terstruktur dalam kategori)\n"
    # "- Daftar pertanyaan yang sudah dijawab pelamar\n"
    # "- Ringkasan jawaban pelamar sejauh ini\n\n"
    # "Tugasmu:\n"
    # "1. Identifikasi apakah mayoritas kategori sudah memiliki minimal satu pertanyaan yang dijawab dengan baik.\n"
    # "2. Evaluasi distribusi jawaban: Jika hanya satu kategori yang dominan atau sebagian besar kategori belum tersentuh, jawabannya belum cukup.\n"
    # "3. Jika sebagian besar kategori sudah terwakili secara merata dan ringkasan mencerminkan pemahaman yang baik, maka wawancara boleh dihentikan.\n\n"
    # "Outputkan hasil akhir dalam format JSON:\n"
    # "{ \"is_finish\": true|false }\n"
# )

instructions = """
Kamu adalah reviewer HR yang bertugas mengevaluasi apakah sesi wawancara sudah cukup lengkap dan dapat dihentikan.

Kamu akan diberikan:
- Daftar seluruh pertanyaan wawancara yang direncanakan (dikelompokkan dalam kategori).
- Daftar pertanyaan yang sudah dijawab pelamar.
- Ringkasan jawaban pelamar sejauh ini.

Tugasmu:
1. Periksa apakah setiap kategori dalam daftar pertanyaan telah memiliki **setidaknya satu pertanyaan** yang dijawab oleh pelamar.
2. Evaluasi kualitas jawaban dari ringkasan. Pastikan jawaban yang diberikan mencerminkan pemahaman yang baik dan relevan.
3. Jika ada kategori yang **belum disentuh sama sekali**, atau mayoritas jawaban berasal hanya dari satu kategori, maka wawancara **belum cukup**.
4. Jika semua kategori penting telah terwakili dengan **distribusi yang cukup merata**, dan pelamar menjawab dengan baik dan jelas, maka wawancara boleh dihentikan.

Outputkan hasil akhir dalam format JSON, hanya berisi satu field:
{ "is_finish": true } jika wawancara sudah cukup, atau
{ "is_finish": false } jika belum.

Jangan berikan penjelasan tambahan apa pun di luar format JSON tersebut.
"""

review_agent = Agent(
    name="ReviewAgent",
    instructions=instructions,
    # model="gpt-4.1-mini-2025-04-14",
    model="litellm/gemini/gemini-2.5-pro",
    output_type=Review,
)