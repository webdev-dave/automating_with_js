const express = require("express");
const _ = require("lodash");

const app = express();

const randomFacts = [
  "You are adopted",
  "Snape killed Dumbeldore",
  "I love you",
];

const apiKeys = { alpha: true, bravo: true, charlie: true };

app.get("/", function (req, res) {
  const randomIdx = _.random(0, randomFacts.length - 1);
  const randomFact = randomFacts[randomIdx];
  res.send(`<h1>${randomFact}</h1>`);
});

app.get("/api", function (req, res) {
  const randomIdx = _.random(0, randomFacts.length - 1);
  const randomFact = randomFacts[randomIdx];

  const apiKey = req.query.apikey;

  if (apiKey in apiKeys) {
    res.json({ randomFact: randomFact });
  } else {
    res.status(404).json({ message: "Please enter a valid api key" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // http://localhost:5000/
  console.log(`Server is running on Port: ${port}`);
});
