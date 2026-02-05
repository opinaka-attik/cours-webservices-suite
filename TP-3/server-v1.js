const http = require("http");

http.createServer((req, res) => {
  if (req.url === "/events") {
    // Headers SSE obligatoires
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    let count = 0;

    // Envoi d’un message toutes les 2 secondes
    const interval = setInterval(() => {
      count++;
      res.write(`data: message ${count}\n\n`);
    }, 2000);

    // Nettoyage quand le client se déconnecte
    req.on("close", () => {
      clearInterval(interval);
      console.log("Client déconnecté");
    });
  }
}).listen(3000, () => {
  console.log("Serveur SSE sur http://localhost:3000/events");
});