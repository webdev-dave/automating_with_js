const robot = require("robotjs");
const _ = require("lodash");
const msleep = require("./../utility").msleep;

const xCenter = 740;
const yCenter = 420;
const imdb = { x: 50, y: 230, color: "000000" };

while (robot.getPixelColor(imdb.x, imdb.y) !== imdb.color) {
  msleep(500);
}

robot.moveMouseSmooth(xCenter, yCenter);

while (true) {
  msleep(1000);
  const mousePosition = robot.getMousePos();
  const mousePositionX = mousePosition.x;
  const mousePositionY = mousePosition.y;

  const randomX = _.random(-100, 100);
  const randomY = _.random(-100, 100);

  robot.moveMouseSmooth(mousePositionX + randomX, mousePositionY + randomY);
}
