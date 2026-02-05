const fs = require('fs');
const readline = require('readline');

// Charger les variables d'environnement depuis .env
function loadEnv() {
    try {
        const content = fs.readFileSync('.env', 'utf-8');
        for (const line of content.split('\n')) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...values] = trimmed.split('=');
                process.env[key] = values.join('=');
            }
        }
    } catch (err) {
        // Fichier .env non trouvé, on continue
    }
}

loadEnv();

const API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

if (!API_KEY) {
    console.log('GROQ_API_KEY manquante');
    process.exit(1);
}

const URL = 'https://api.groq.com/openai/v1/chat/completions';

const HEADERS = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'node-fetch/1.0 (compatible; Groq)'
};

// Appeler l'API Groq
async function callGroq(message) {
    const payload = {
        model: MODEL,
        messages: [
            { role: 'user', content: message }
        ]
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(payload)
        });

        if (response.status !== 200) {
            const text = await response.text();
            console.log('HTTP ERROR:', response.status, text);
            return null;
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (err) {
        console.log('Erreur:', err.message);
        return null;
    }
}

// Interface de lecture
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Chat Groq (tapez 'exit' pour quitter)\n");

// Boucle de chat
function ask() {
    rl.question('Vous: ', async (msg) => {
        msg = msg.trim();

        if (!msg) {
            ask();
            return;
        }

        if (msg.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        const reply = await callGroq(msg);
        if (reply) {
            console.log('\nIA:', reply, '\n');
        } else {
            console.log('Erreur API\n');
        }

        ask();
    });
}

// Gérer Ctrl+C
rl.on('close', () => {
    console.log('\nAu revoir!');
    process.exit(0);
});

ask();
