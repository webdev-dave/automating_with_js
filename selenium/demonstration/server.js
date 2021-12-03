const express = require("express");
var parser = require("ua-parser-js");
const app = express();

app.get(
  "/",
  function (req, res, next) {
    const userAgent = parser(req.headers["user-agent"]).ua;

    if (userAgent.includes("axios") || userAgent.includes("python-requests")) {
      return res.status(403).send({
        message: "This is an error!",
      });
    } else {
      next();
    }
  },
  function (req, res) {
    res.send(`
  <h1>Hello visitor</h1>
  <p>Pease do not scrape us</p>

  <p>US has literacy rate of 99%</p>
  <p>Candyland has literacy rate of 50%</p>
  <p>Lead Paint for Breakfast Land has literacy rate of 10%</p>
  `);
  }
);

// http://localhost:3000/
app.listen(3000);
