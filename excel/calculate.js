import * as XLSX from "xlsx/xlsx.mjs";
//import { read } from "xlsx/xlsx.mjs";
import * as fs from "fs";

const spreadSheet = fs.readFileSync("./scores.xlsx"); 
const workbook = XLSX.read(spreadSheet);
const workSheet = workbook.Sheets["Sheet1"];

const studentsArr = XLSX.utils.sheet_to_json(workSheet, {});
console.log(studentsArr);



















// const XLSX = require("xlsx");

// const workbook = XLSX.readFile("scores.xlsx");
// const worksheet = workbook.Sheets["Sheet1"];

// const arrStudents = XLSX.utils.sheet_to_json(worksheet);
// const highSchoolData = {}; // {highSchool: {numStudents: 0, cumalativeScore: 0}}

// // Fill out hsData
// for (const student of arrStudents) {
//   const highSchool = student["High School"];
//   const studentAverage = student["Average"];

//   if (highSchool in highSchoolData === false) {
//     highSchoolData[highSchool] = { numStudents: 0, cumalativeScore: 0 };
//   }

//   highSchoolData[highSchool].numStudents += 1;
//   highSchoolData[highSchool].cumalativeScore += studentAverage;
// }

// // Log out average score for each high school using highSchoolData
// for (const highSchool of Object.keys(highSchoolData)) {
//   const highSchoolAverage =
//     highSchoolData[highSchool].cumalativeScore /
//     highSchoolData[highSchool].numStudents;
//   console.log(`The average score for ${highSchool} is ${highSchoolAverage}`);
// }
