const fs = require("fs");
const robot = require("robotjs");
const clipboardy = require("clipboardy");
const msleep = require("../utility.js").msleep;

const paragraph = {
  topLeft: { x: 66, y: 164 },
  bottomRight: { x: 656, y: 364 },
};
const factButton = { x: 160, y: 420, color: "135aff" };

while (robot.getPixelColor(factButton.x, factButton.y) !== factButton.color) {
  msleep(500);
}

let fileString = "";

function copyAndGetNewFact(numFactsToGet) {
  for (let i = 0; i < numFactsToGet; i++) {
    //Copy current fact
    robot.moveMouse(paragraph.topLeft.x, paragraph.topLeft.y);
    robot.mouseToggle("down");
    robot.dragMouse(paragraph.bottomRight.x, paragraph.bottomRight.y);
    robot.mouseToggle("up");

    robot.keyTap("c", "command");
    fileString = fileString + clipboardy.readSync() + "\n";

    //Get new fact
    robot.moveMouse(factButton.x, factButton.y);
    robot.mouseClick();
  }
}

copyAndGetNewFact(5);
fs.writeFileSync("output.txt", fileString);
