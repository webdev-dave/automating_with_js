import * as fs from "fs";
import { generateDomainCountCSV } from "./csv_generator.js";
import { sendEmail } from "./send_email.js";


const usersCSV = fs.readFileSync("./csvFiles/USERS.csv");
generateDomainCountCSV(usersCSV);

// Grab output csv that was just generated from above
const domainCountCSV = fs.readFileSync("./csvFiles/DOMAIN_COUNT.csv");

// Email output csv
sendEmail("elidovrich.coding@gmail.com", {filename: "meow2", content: domainCountCSV});
