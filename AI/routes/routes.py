from flask import Blueprint, render_template, request, redirect, url_for

from controller.question_controller import generate_questions
from controller.asker_controller import ask_questions
from controller.summary_controller import summarize_answer
from controller.review_controller import review_summary
from controller.chat_controller import chat
from controller.index_controller import index
api = Blueprint('ai',__name__, url_prefix='/ai')


# api.route('/question', methods=['GET'])(generate_questions)
# api.route('/ask', methods=['GET'])(ask_questions)
# api.route('/summary', methods=['POST'])(summarize_answer)
# api.route('/review', methods=['GET'])(review_summary)
api.route('/chat/<id>', methods=['POST'])(chat)
api.route('/', methods=['GET'])(index)
# api.route('/test', methods=['GET'])(index)