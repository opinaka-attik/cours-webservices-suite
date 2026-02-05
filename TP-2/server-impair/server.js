const http = require("http");

http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { value } = JSON.parse(body);
      console.log("IMPAIR reçu :", value);
      res.end("OK");
    });
  }
}).listen(3000, () => {
  console.log("Serveur IMPAIR prêt");
});