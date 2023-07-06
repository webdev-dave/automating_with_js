import * as XLSX from "xlsx/xlsx.mjs";
//import { read } from "xlsx/xlsx.mjs";
import * as fs from "fs";

const spreadSheet = fs.readFileSync("./scores.xlsx");
const workbook = XLSX.read(spreadSheet);
const workSheet = workbook.Sheets["Sheet1"];

export const studentsArr = XLSX.utils.sheet_to_json(workSheet, {});
const highSchoolData = {};
//highSchoolName: {numStudents: 0, cumulativeScore: 0}

studentsArr.forEach((student) => {
  const highSchoolName = student["High School"];
  if (!highSchoolData[highSchoolName]) {
    highSchoolData[highSchoolName] = {
      numStudents: 0,
      cumulativeAverage: 0,
    };
  } else {
    highSchoolData[highSchoolName].numStudents++;
    highSchoolData[highSchoolName].cumulativeAverage +=  student.Average / 2;
  } 
});

//Log out the (average) cumulative score for each highschool
for(const highSchool of Object.keys(highSchoolData)){
  console.log("The cumulative average score of "+highSchool+" is: "+highSchoolData[highSchool].cumulativeAverage)
};