from tools import tools
import time

from models.asker_model import ask_questions
from models.question_model import generate_questions
from models.summary_model import summarize_answer
from models.review_model import review_summary


async def a_generate_questions(id):
    data_interview = tools.get_data_job_str(id)
    list_question = await generate_questions(data_interview)
    tools.post_interview_questions(id, list_question)
    tools.post_status_interview(id, "in_progress")
    pass

async def b_create_summary(id, input_data):
    tools.post_log_interview(id, input_data, is_user=True)
    data_ringkasan = tools.get_summary_interview(id)
    data_ringkasan = data_ringkasan['data']['summary']
    last_question = tools.get_last_question_log_interview(id) or ""

    summary = await summarize_answer(input_data, data_ringkasan, last_question)
    tools.post_summary_interview(id, summary)

async def c_review_summary(id):
    list_pertanyaan = tools.get_interview_questions(id)
    data_ringkasan = tools.get_summary_interview(id)
    data_ringkasan_result = data_ringkasan['data']['summary']
    answered_questions = tools.get_answered_questions(id)
    review = await review_summary(list_pertanyaan=list_pertanyaan, data_ringkasan=data_ringkasan_result, list_answered_question=answered_questions)
    if review == True:
        tools.post_status_interview(id, "finished")
        return "Interview has finished."
    return "Interview is still in progress, more questions may be needed."



async def d_ask_questions(id, start_time):
    list_pertanyaan = tools.get_interview_questions(id)
    data_ringkasan = tools.get_summary_interview(id)
    data_ringkasan = data_ringkasan['data']['summary']
    answered_questions = tools.get_answered_questions(id)
    questions = await ask_questions(list_pertanyaan, data_ringkasan,answered_questions)
    elapsed_time = time.time() - start_time
    tools.post_log_interview(id, questions, is_user=False, elapsed_time=elapsed_time)
    tools.push_answered_questions(id, questions)
    return questions