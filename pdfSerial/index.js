//This script grabs first page of every pdf file in a give directory and saves it a new pdf file.
//The new pdf file is named by extracting a serial number that is contained inside the pdf file

const fs = require("fs");
const pdfParse = require("pdf-parse");
const muhammara = require("muhammara");
/* cSpell:ignore muhammara, pdfs */

async function main() {
  const pdfFiles = fs.readdirSync("./pdfs/input");

  for (const pdfFile of pdfFiles) {
    const pathToCurrentPDF = `./pdfs/input/${pdfFile}`;
    //check if fileType is a PDF file
    if (pdfFile.match(/\.pdf$/)) {
      //only get data on page 1
      const data = await pdfParse(fs.readFileSync(pathToCurrentPDF), {
        max: 1,
      });
      //grab serial from first page in pdf
      const serial = data.text.trim();
      //Create a new PDF by grabbing the first page of each input pdf
      const pdfWriter = muhammara.createWriter(`./pdfs/output/${serial}.pdf`);
      pdfWriter.appendPDFPagesFromPDF(pathToCurrentPDF, {
        type: muhammara.eRangeTypeSpecific,
        specificRanges: [[0, 0]],
      });
      pdfWriter.end();
    }
  }
}

main();
