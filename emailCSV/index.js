import * as fs from "fs";
import { generateDomainCountCSV } from "./csv_generator.js";


const usersCSV = fs.readFileSync("./csvFiles/USERS.csv");
generateDomainCountCSV(usersCSV);