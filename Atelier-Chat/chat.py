import os
import json
import requests

def load_env():
    try:
        with open('.env', 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    k, v = line.split('=', 1)
                    os.environ[k] = v
    except FileNotFoundError:
        pass

load_env()

API_KEY = os.environ.get("GROQ_API_KEY")
MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

if not API_KEY:
    print("GROQ_API_KEY manquante")
    exit(1)

URL = "https://api.groq.com/openai/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "User-Agent": "node-fetch/1.0 (compatible; Groq)"
}

def call_groq(message):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": message}
        ]
    }

    r = requests.post(URL, headers=HEADERS, json=payload, timeout=30)

    if r.status_code != 200:
        print("HTTP ERROR:", r.status_code, r.text)
        return None

    return r.json()["choices"][0]["message"]["content"]

print("Chat Groq (tapez 'exit' pour quitter)\n")

while True:
    try:
        msg = input("Vous: ").strip()
        if not msg:
            continue
        if msg.lower() == "exit":
            break

        reply = call_groq(msg)
        if reply:
            print("\nIA:", reply, "\n")
        else:
            print("Erreur API\n")

    except (KeyboardInterrupt, EOFError):
        break
