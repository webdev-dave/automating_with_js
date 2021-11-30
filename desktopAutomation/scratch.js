const robot = require("robotjs");
const msleep = require("../utility.js").msleep;

while (true) {
  msleep(500);
  const mouse = robot.getMousePos();
  console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
}
