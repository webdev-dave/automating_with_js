import * as fs from "fs";
import { parse } from 'csv-parse/sync';
import {stringify} from 'csv-stringify/sync';

export function generateDomainCountCSV(usersCSV) {
  const usersArray = parse(usersCSV, {
    columns: true,
    skip_empty_lines: true,
  });

  const domainCount = {}; // {gmail.com: 2};
  for (const user of usersArray){
    const domain = user.email.split("@")[1];
    if(domain in domainCount){
      domainCount[domain]++;    
    } else {
      domainCount[domain] = 1;
    }
  }

  //init temp array of sub arrays that will become the csvFileWe export
  //start with first subArray which contains the column names/titles/headers
  const temp = [["domain", "count"]];
  //add the remaining data into the subsequent rows 
  for (const entry of Object.entries(domainCount)){
    temp.push(entry)
  }
  //sort from most frequent domain names to least frequent
  const columnNames = temp[0];
  const sortedTemp = [columnNames,  ...temp.slice(1).sort((a,b) => b[1] - a[1])]

  const data = stringify(sortedTemp);
  fs.writeFileSync("./csvFiles/DOMAIN_COUNT.csv", data);


}

