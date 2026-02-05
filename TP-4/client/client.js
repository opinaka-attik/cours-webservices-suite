const WebSocket = require("ws");

function connect() {
  console.log("Tentative de connexion...");

  const ws = new WebSocket("ws://host.docker.internal:9000");

  ws.on("open", () => {
    console.log("✅ Client connecté au serveur WebSocket");
  });

  ws.on("message", data => {
    const value = data.toString();
    console.log("⬅️ reçu :", value);

    const reversed = value.split("").reverse().join("");
    console.log("➡️ renvoyé :", reversed);

    ws.send(reversed);
  });

  ws.on("close", () => {
    console.log("🔌 Connexion fermée, nouvelle tentative dans 3s");
    setTimeout(connect, 3000);
  });

  ws.on("error", err => {
    console.log("❌ Connexion impossible, serveur non prêt");
  });
}

connect();
