import os
import asyncio
from dotenv import load_dotenv

from flow.flow import (
    a_generate_questions,
    b_create_summary,
    c_review_summary,
    d_ask_questions
)

import tools.tools as tools

from models.question_model import generate_questions

from agent.question_agent import interview_agent

from agents import Runner
# Load environment variables from .env file
load_dotenv()



async def main():

    print(await c_review_summary("687bd1ef66018c9885d8156a"))

    # list_pertanyaan = tools.get_interview_questions("687ba1c466018c9885d81564")
    # data_ringkasan = tools.get_summary_interview("687ba1c466018c9885d81564")
    # data_ringkasan_result = data_ringkasan['data']['summary']
    # answered_questions = tools.get_answered_questions("687ba1c466018c9885d81564")

    # print(f"List Pertanyaan: {list_pertanyaan}")
    # print(f"Data Ringkasan: {data_ringkasan_result}")
    # print(f"Answered Questions: {answered_questions}")
    pass

asyncio.run(main())

# import tools.tools as tools

# def main():
#     # print(tools.get_data_)
#     # print(tools.get_data_job('68493a93d032d9778a22eab8'))
#     print(tools.get_data_job_str('687b124603281026efe96e04'))

#     # print(tools.get_data_company('687a092f03281026efe96dfd'))
# if __name__ == "__main__":
#     main()