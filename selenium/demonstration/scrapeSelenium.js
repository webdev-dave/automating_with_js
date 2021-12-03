const msleep = require("./../../utility").msleep;
const { Builder, By } = require("selenium-webdriver");

async function scrapeWithSelenium() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  await driver.get("http://localhost:3000/");
  msleep(3000);

  //Scrape
  const paragraphs = await driver.findElements(By.css("p"));
  for (const paragraph of paragraphs) {
    const content = await paragraph.getText();
    console.log(content);
  }
}

scrapeWithSelenium();
