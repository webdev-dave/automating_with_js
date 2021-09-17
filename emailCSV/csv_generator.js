const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const stringify = require("csv-stringify/lib/sync");

function generateDomainCountCSV(usersCSV) {
  const usersArray = parse(usersCSV, {
    columns: true,
    skip_empty_lines: true,
  });

  const domainCount = {}; // {gmail.com: 5}

  // Fill out domainCount
  for (const user of usersArray) {
    const domain = user.email.split("@")[1];
    if (domain in domainCount) {
      domainCount[domain]++;
    } else {
      domainCount[domain] = 1;
    }
  }

  const temp = [["domain", "count"]];

  for (const entry of Object.entries(domainCount)) {
    temp.push(entry);
  }

  // Sort from greatest to least
  temp.sort((a, b) => b[1] - a[1]);

  const data = stringify(temp);
  fs.writeFileSync("./csvFiles/DOMAIN_COUNT.csv", data);
}

module.exports = { generateDomainCountCSV };
