const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let values = [];

// Générer une valeur aléatoire toutes les 3s
setInterval(() => {
  const value = Math.floor(Math.random() * 100);
  values.push(value);
  console.log("Valeur générée :", value);
  // conserver seulement les 10 dernières
  if (values.length > 10) values.shift();
}, 3000);

// Endpoint pour récupérer toutes les valeurs
app.get("/values", (req, res) => {
  res.json(values);
});

app.listen(PORT, () => console.log(`Server REST prêt sur http://localhost:${PORT}`));