const fs = require("fs");
const axios = require("axios");
const numeral = require("numeral");

main();
async function main() {
  const countries = fs
    .readFileSync("input.txt")
    .toString()
    .split("\n")
    .map((country) => country.replace(/\r$/, ""));

  for (const country of countries) {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const response = await axios.get(url);
    const data = response.data[0];
    const name = data.name.common;
    const subregion = data.subregion;
    const population = numeral(data.population).format("0,0");
    const outputData = `${name} is located in ${subregion} and has a population of ${population}`;
    const outputFileName = name.toLowerCase().replace(/\s/, "_");

    fs.writeFileSync(`./output/${outputFileName}_output_data.txt`, outputData, (err) => { if (err) throw err; });
  }
  
};
