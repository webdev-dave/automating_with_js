// const open = require("open");
// const {openApp} = require("open");
import open, {openApp} from "open";

const urls = [
  "https://github.com/webdev-dave",
  "https://app.netlify.com/teams/e-d-richard/overview",
  "https://www.duolingo.com/learn",
  "https://www.codecademy.com/career-journey/full-stack-engineer/path/fscj-22-web-development-foundations/track/fscj-22-welcome-to-the-full-stack-engineer-path"
];

// urls.forEach(url => open(url));

const telegramPath = "C:\\Users\\elido\\AppData\\Roaming\\Telegram Desktop\\Telegram.exe";
const musicFile = "C:\\1 - Avrumy straus - Carlebach Shabbos Medley.mp3";

open(musicFile);

openApp(telegramPath);













