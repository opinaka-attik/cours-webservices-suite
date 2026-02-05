FROM python:3.11-slim
WORKDIR /app
COPY chat.py .
COPY .env .
RUN pip install --no-cache-dir requests
CMD ["python", "chat.py"]
