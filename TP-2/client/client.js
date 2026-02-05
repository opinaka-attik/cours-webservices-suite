const http = require("http");

const subscriptions = [
  {
    name: "PAIR",
    host: "host.docker.internal",
    port: 8001,
    filter: v => v % 2 === 0
  },
  {
    name: "IMPAIR",
    host: "host.docker.internal",
    port: 8002,
    filter: v => v % 2 !== 0
  }
];

function randomValue() {
  return Math.floor(Math.random() * 100);
}

function randomDelay() {
  return Math.floor(Math.random() * 8000) + 2000;
}

function send(value, sub) {
  const data = JSON.stringify({ value });

  const req = http.request({
    host: sub.host,
    port: sub.port,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  });

  // 🔐 IMPORTANT : éviter le crash pédagogique
  req.on("error", err => {
    console.error(`❌ ${sub.name} indisponible`);
  });

  req.write(data);
  req.end();

  console.log(`➡️ ${value} envoyé à ${sub.name}`);
}

function loop() {
  const value = randomValue();
  console.log("\nValeur générée :", value);

  subscriptions.forEach(sub => {
    if (sub.filter(value)) {
      send(value, sub);
    }
  });

  setTimeout(loop, randomDelay());
}

loop();
