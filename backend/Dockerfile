# Dockerfile
FROM python:3.10
WORKDIR /code

RUN apt-get update --fix-missing
RUN apt-get install -y uuid-runtime

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY src .

ENTRYPOINT ["./server.py"]