import * as XLSX from "xlsx";
import * as fs from "fs";

const spreadSheet = fs.readFileSync("./spreadsheets/scores.xlsx");
const workbook = XLSX.read(spreadSheet);
const worksheet = workbook.Sheets["Sheet1"];
const range = XLSX.utils.decode_range(worksheet["!ref"]);//Grabs number of rows and columns in our worksheet

//console.log(range);

//Loop over every row/student in our worksheet
for(let rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
  const highSchool = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 1})].v;
  //give extra 30 points to Test #2 for all students of Lead Paint HS

  if(highSchool === "Lead Paint HS"){
    const testTwoRow = 3; 
    worksheet[XLSX.utils.encode_cell({r: rowNum, c: testTwoRow})].v += 30;
  }
}

const newWb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWb, worksheet, "Sheet1");
XLSX.writeFile(newWb, "scoresWithCurve.xlsx");

//move scoresWithCurve into the <spreadsheets> directory
const localFiles = fs.readdirSync("./");
const pathToCurrentDir = process.cwd();
for(const file of localFiles){
  if(file === "scoresWithCurve.xlsx"){
    fs.renameSync(file, `${pathToCurrentDir}/spreadsheets/${file}`)
  }
}
console.log(pathToCurrentDir);


