const open = require("open");

const urls = [
  "https://www.reddit.com/",
  "https://9gag.com/",
  "https://www.nytimes.com/",
  "https://www.reuters.com/",
];

for (const url of urls) {
  open(url, { app: { name: "google chrome" } });
}

open("/Applications/Spotify.app/Contents/MacOS/Spotify");
