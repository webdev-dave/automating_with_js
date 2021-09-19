const fs = require("fs");
const axios = require("axios");
const numeral = require("numeral");

async function main() {
  const countries = fs.readFileSync("input.txt").toString().split("\n");

  for (const country of countries) {
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    const response = await axios.get(url);
    const data = response.data[0];

    const name = data.name;
    const subregion = data.subregion;
    const population = numeral(data.population).format("0,0");

    console.log(
      `${name} is located in ${subregion} and has a population of ${population}`
    );
  }
}

main();
