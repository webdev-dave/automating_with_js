import * as XLSX from "xlsx";
//import { read } from "xlsx/xlsx.mjs";
import * as fs from "fs";

import { studentsArr } from "./calculate.js";

studentsArr.forEach((student) => {
  console.log(student);
  if (student["High School"] === "Lead Paint HS") {
    student["T2 Score"] += 100;
  }
});



const newWorkSheet = XLSX.utils.json_to_sheet(studentsArr);
const newWorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, "Bad Sheet");
XLSX.writeFile (newWorkBook, "scores2.xlsx");
