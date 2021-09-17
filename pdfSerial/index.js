const fs = require("fs");
const pdf = require("pdf-parse");
const hummus = require("hummus");

async function main() {
  const pdfFiles = fs.readdirSync("./pdfs/input/");

  for (const pdfFile of pdfFiles) {
    const pathToCurrentPDF = `./pdfs/input/${pdfFile}`;

    //Grabs serial
    const data = await pdf(fs.readFileSync(pathToCurrentPDF), { max: 1 });
    const serial = data.text.trim();

    // Create new pdf
    const pdfWriter = hummus.createWriter(`./pdfs/output/${serial}.pdf`);
    pdfWriter.appendPDFPagesFromPDF(pathToCurrentPDF, {
      type: hummus.eRangeTypeSpecific,
      specificRanges: [[0, 0]],
    });
    pdfWriter.end();
  }
}

main();
