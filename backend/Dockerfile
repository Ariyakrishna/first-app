FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV MONGO_URI mongodb://mongo:27017/mydatabase

CMD ["python", "app.py"]
