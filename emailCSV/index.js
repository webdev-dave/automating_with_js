const fs = require("fs");

const csvGenerator = require("./csv_generator");
const sendMail = require("./send_email");

const usersCSV = fs.readFileSync("./csvFiles/USERS.csv");

// Generate output CSV
csvGenerator.generateDomainCountCSV(usersCSV);
// Grab output CSV that was just generated from above
const domainCountCSV = fs.readFileSync("./csvFiles/DOMAIN_COUNT.csv");

//Email output CSV
sendMail("kaecsvemailproject@gmail.com", {
  filename: "meow2",
  content: domainCountCSV,
});
