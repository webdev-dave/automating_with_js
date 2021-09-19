const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const dateFormat = require("dateformat");

async function main() {
  const dates = fs.readFileSync("input.txt").toString().split("\n");

  for (const date of dates) {
    const wikiCompatibleDate = dateFormat(date, "yyyy-mm-dd");
    const res = await axios.get(
      `https://en.wikipedia.org/wiki/Template:POTD/${wikiCompatibleDate}`
    );
    const $ = cheerio.load(res.data);

    const imageSrc = $("div a.image img").attr("src");
    const imageUrl = `https:${imageSrc}`;
    const image = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });

    const usDateFormat = dateFormat(date, "mm-dd-yyyy");
    image.data.pipe(fs.createWriteStream(`${usDateFormat}.jpg`));
  }
}

main();
