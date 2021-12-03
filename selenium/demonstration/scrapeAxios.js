const axios = require("axios");

async function scrapeWithAxios() {
  const res = await axios.get("http://localhost:3000/");
  console.log(res.data);
}

scrapeWithAxios();
