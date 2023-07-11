import * as fs from "fs";
import path from "path";
// Note!! cheerio uses jQuery syntax
import * as cheerio from "cheerio";
import axios from "axios";
import dateFormat from "dateformat";

main();
async function main() {
  const dates = fs.readFileSync("input.txt").toString().split("\n");

  for await (const date of dates) {
    console.log("downloading", date)
    const wikiCompatibleDate = dateFormat(date, "yyyy-mm-dd");
    const usDateFormat = dateFormat(date, "mm-dd-yyyy");
    const res = await axios.get(
      `https://en.wikipedia.org/wiki/Template:POTD/${wikiCompatibleDate}`
    );

    const $ = cheerio.load(res.data);

    const imageSrc = $("div a.image img").attr("src");
    const imageUrl = `https:${imageSrc}`;

    if (imageSrc) {
      const image = await axios({
        method: "get",
        url: imageUrl,
        responseType: "stream",
      });
      const imageFileName = `${usDateFormat}_wiki_POTD.jpg`;
      image.data.pipe(fs.createWriteStream(`./downloadedImages/${imageFileName}`));
    
    } else {
      //If picture of the day is a video or other media type
      console.log(`Error! the wiki POTD for ${usDateFormat} is not an image`);
    }
  }
}


// async function moveImagesToDir() {
//   const pathToCurrentDir = process.cwd();
//   const jpgFiles = fs.readdirSync("./").filter((file) => file.endsWith(".jpg"));
//   console.log(jpgFiles);
//   for await(const file of jpgFiles){
//     fs.renameSync(file, `${pathToCurrentDir}/downloadedImages/${file}`)
//   }

// }
