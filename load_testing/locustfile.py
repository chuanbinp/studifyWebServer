import time
import random
from locust import HttpUser, task, between

login_queries = ["/students/login?username=phoechuanbin&password=chuanbin",
                "/students/login?username=ooiminhui&password=okxmlcaq",
                "/students/login?username=wongxiaoqing&password=nbqk3l83",
                "/students/login?username=chengangzhe&password=beast"]

class load_testing(HttpUser):
    wait_time = between(0.5, 1)

    def login(self):
        self.client.get(random.choice(login_queries))

    @task
    def question(self):
        self.client.get("/questions")
        self.client.get("/questions/6033a7768d9e9fffb916c03a")
        self.client.post("/questions/gamequery", json={"category": "Requirement Engineering", "difficulty": "Easy", "pastQnsIds": []})

    @task
    def assignment(self):
        self.client.get("/assignments")
        self.client.get("/assignments/assignmentsonly")
        self.client.get("/assignments/question/60615be7c1aac115ac7f2a35")

    @task
    def resource(self):
        self.client.get("/resources")
        self.client.get("/resources/campaignvideo/")

    @task
    def student(self):
        self.client.get("/students")

    @task
    def campaignResult(self):
        self.client.get("/campaignResults")

    @task
    def assignmentResult(self):
        self.client.get("/assignmentResults")
        self.client.post("/assignmentResults/", json={"userId": "6038af8e801a6c272c85370c",
                                                    "userName": "phoechuanbin",
                                                    "avatar": "2",
                                                    "assignmentId": "606085c7fdf3f95364a3b006",
                                                    "score":"5",
                                                    "wrongQuestionIds":[]})

    @task
    def teacher(self):
        self.client.post("/teachers/login", json={"username": "teacher1", "password": "teacher1"})

    