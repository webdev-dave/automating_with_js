import * as fs from "fs";
// Note!! cheerio uses jQuery syntax
import * as cheerio from 'cheerio';
import axios from 'axios';

const url = "https://en.wikipedia.org/wiki/List_of_countries_by_literacy_rate";


fetchLiteracyRates()

async function fetchLiteracyRates(){
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  let fileString = "";
  let countryListNumber = 0;
  
  const table = $('th:contains("Literacy rate")').parent().parent();
  table.find("tbody tr").slice(2).each((i, element)=>{
    const $row = $(element);
    countryListNumber++;

    const countryName = $row.find('a').first().text().replace("*","").trim();
    const literacyRate = $row.find("td").slice(1,2).text().trim();
    //prevent scraping data from the any following tables with a similarly named header
    if(countryListNumber > 195) return;

    if(countryName){
      fileString += `${countryListNumber}) ${countryName}: ${literacyRate}`;
    }
  });

  fs.writeFileSync("output.txt", fileString);
};

