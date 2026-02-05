// server.js
const http = require("http");

let globalCount = 0;
const clients = [];

http.createServer((req, res) => {
  if (req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    // On garde la connexion du client
    clients.push(res);

    // Nettoyage à la déconnexion
    req.on("close", () => {
      clients.splice(clients.indexOf(res), 1);
      console.log("Client déconnecté");
    });
  }
}).listen(3000, () => {
  console.log("Serveur SSE (broadcast) sur http://localhost:3000/events");
});

// Envoi global toutes les 2 secondes
setInterval(() => {
  globalCount++;
  clients.forEach(res => {
    res.write(`data: message ${globalCount}\n\n`);
  });
}, 2000);
