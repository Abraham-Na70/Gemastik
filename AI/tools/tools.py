import requests
import os

import os

backend_host = os.environ.get("BACKEND", "localhost")
backend_port = os.environ.get("BACKEND_PORT", "5000")

base_url = f"http://{backend_host}:{backend_port}"

def get_data_interview(id):
    url = f"{base_url}/api/interview/{id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_job_id(id):
    data = get_data_interview(id)
    data = data['data']['job_id']
    return data

def get_data_job(id):
    job_url = get_job_id(id)
    url = f"{base_url}/api/jobs/id/{job_url}"
    response = requests.get(url)

    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_data_company(id):
    url = f"{base_url}/api/company/id/{id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

def get_data_job_str(id):
    data = get_data_job(id)
    if data:
        job_desc = data['data']['description']
        skills = data['data']['skills']
        company_id = data['data']['company_id']
        company_data = get_data_company(company_id)
        company_name = company_data['data']['name'] if company_data else "Unknown Company"
        company_desc = company_data['data']['description'] if company_data else "No description available"

        skills_str = ', '.join(skills)
        job_str = f"Deskripsi Pekerjaan: {job_desc}\n\nKeterampilan yang Diperlukan: {skills_str}\n\nInformasi Perusahaan: {company_name}\n{company_desc} \n\n company_data: {company_data} \n\n company_id: {company_id}   "
        return job_str

        # return data
        # return job_str
    else:
        print("Error: Unable to fetch job data.")
        return None

def get_status_interview(id):
    data = get_data_interview(id)

    data = data['data']['status']
    return data

def post_status_interview(id, status):
    url = f"{base_url}/api/interview/{id}"
    payload = {
        "status": status
    }
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_interview_questions(id):
    data = get_data_interview(id)
    if data:
        questions = data['data']['list_question']
        return questions
    else:
        print("Error: Unable to fetch interview questions.")
        return None

def post_interview_questions(id, questions):
    url = f"{base_url}/api/interview/{id}"
    payload = {
        "list_question": questions
    }
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_log_interview(id):
    url = f"{base_url}/api/interview/log/{id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_last_question_log_interview(id):
    data = get_log_interview(id)
    if data and 'data' in data and 'chat' in data['data']:
        data = data['data']['chat']

        last_question = next(
            (msg['message'] for msg in reversed(data) if msg['sender'] == 'assistant'),
        )
        return last_question
    return None

    
def post_log_interview(id, log, is_user=False, elapsed_time=None):
    """
    Post log to the interview with the given ID.
    Args:
        id (str): The ID of the interview.
        log (str): The log message to be posted.
        is_user (bool): Flag to indicate if the log is from the user.
    """
    url = f"{base_url}/api/interview/log/{id}"
    payload = {
        "sender": "user" if is_user else "assistant",
        "message": log,
        "elapsed_time": elapsed_time
    }
    print(f"Posting log to {url} with payload: {payload}")
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_summary_interview(id):
    url = f"{base_url}/api/interview/memory/{id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    


def post_summary_interview(id, summary):
    url = f"{base_url}/api/interview/memory/{id}"
    payload = {
        "summary": summary
    }
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

def push_answered_questions(id, questions):
    url = f"{base_url}/api/interview/memory/{id}/push"
    payload = {
        "answered_question": questions
    }
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_answered_questions(id):
    data = get_summary_interview(id)
    if data and 'data' in data and 'answered_question' in data['data']:
        answered_questions = data['data']['answered_question']
        return answered_questions
    else:
        # print("Error: Unable to fetch answered questions.")
        return None
    
def list_question_to_string(list_question):
    result = ""
    for category in list_question:
        result += f"Kategori: {category['category_name']}\n"
        for idx, q in enumerate(category["questions"], start=1):
            result += f"{idx}. {q['question']}\n"
        result += "\n"
    return result