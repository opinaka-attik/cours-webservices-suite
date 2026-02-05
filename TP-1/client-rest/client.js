const axios = require("axios");

const API_URL = process.env.API_URL;

const subscriptions = [
  { name: "PAIR", filter: v => v % 2 === 0 },
  { name: "IMPAIR", filter: v => v % 2 !== 0 }
];

setInterval(async () => {
  try {
    const res = await axios.get(`${API_URL}/values`);
    const values = res.data;

    values.forEach(v => {
      subscriptions.forEach(sub => {
        if (sub.filter(v)) {
          console.log(`➡️ ${v} traité par ${sub.name}`);
        }
      });
    });
  } catch (err) {
    console.log("❌ Server REST indisponible");
  }
}, 4000);
