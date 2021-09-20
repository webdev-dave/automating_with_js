const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://en.wikipedia.org/wiki/List_of_countries_by_literacy_rate";

async function fetchLiteracyRates() {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  let fileString = "";

  const table = $('caption:contains("Literacy rate by country")').parent();
  table
    .find("tbody tr")
    .slice(2)
    .each((i, element) => {
      const $row = $(element);

      const countryName = $row.find("a").first().text();
      const literacyRate = $row.find("td").slice(1, 2).text();

      fileString += `${countryName}, ${literacyRate}\n`;
    });

  fs.writeFileSync("output.txt", fileString);
}

fetchLiteracyRates();
