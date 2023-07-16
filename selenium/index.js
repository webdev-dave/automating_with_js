const fs = require("fs");
const msleep = require("./../utility").msleep;
const { Builder, By, Key } = require("selenium-webdriver");


main();
async function main() {
  let fileString = "";
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  await driver.get("https://en.wikipedia.org");


  await searchInput().sendKeys("List of countries by literacy rate");
  msleep(2000);

  await driver.findElement(By.css("ul.cdx-menu__listbox li:first-child")).click();
  msleep(2000);

  const tables = await driver.findElements(
    By.css("table.wikitable.sortable.static-row-numbers")
  );
  const alrTable = tables[1];
  let alrRows = await alrTable.findElements(By.css("tr"));
  alrRows = alrRows.slice(2, -1);

  for (const alrRow of alrRows) {
    const countryName = await alrRow.findElement(By.css("a")).getText();

    const alrCol = await alrRow.findElements(By.css("td"));
    const literacyRateCol = alrCol[1];
    const literacyRate = await literacyRateCol.getText();

    fileString += `${countryName}, ${literacyRate}\n`;
    console.log(`Grabbed literacy rate of ${countryName}`);
  }

    fs.writeFileSync("output.txt", fileString);

    function searchInput(action) {
      return driver.findElement(By.css(".cdx-text-input__input"));
    }
}

