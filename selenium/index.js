const fs = require("fs");
const msleep = require("./../utility").msleep;
const { Builder, By, Key, until } = require("selenium-webdriver");

async function main() {
  let fileString = "";
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  await driver.get("https://en.wikipedia.org/wiki/Main_Page");

  const searchInput = await driver.findElement(By.css("#searchInput"));
  await searchInput.sendKeys("List of countries by literacy rate");
  msleep(2000);
  await searchInput.sendKeys(Key.DOWN, Key.ENTER);

  const tables = await driver.findElements(
    By.css("table.wikitable.sortable.static-row-numbers")
  );
  const alrTable = tables[1];
  let alrRows = await alrTable.findElements(By.css("tr"));
  alrRows = alrRows.slice(2);

  for (const alrRow of alrRows) {
    const countryName = await alrRow.findElement(By.css("a")).getText();

    const alrCol = await alrRow.findElements(By.css("td"));
    const literacyRateCol = alrCol[1];
    const literacyRate = await literacyRateCol.getText();

    fileString += `${countryName}, ${literacyRate}\n`;
  }

  fs.writeFileSync("output.txt", fileString);
}

main();