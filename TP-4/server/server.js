
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

console.log("Serveur WebSocket prêt");

function randomValue() {
  return Math.floor(Math.random() * 1000).toString();
}

wss.on("connection", ws => {
  console.log("Client connecté");

  const interval = setInterval(() => {
    const value = randomValue();
    console.log("➡️ envoyé :", value);
    ws.send(value);
  }, 3000);

  ws.on("message", msg => {
    console.log("⬅️ réponse client :", msg.toString());
  });

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client déconnecté");
  });
});