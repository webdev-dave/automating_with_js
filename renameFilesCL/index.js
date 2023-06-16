const fs = require("fs");
const fileNames = fs.readdirSync("./");
const digitsRegex = /\d{1,}/;
const lettersRegex = /[a-zA-Z]{1,}/;
const fileTypeRegex = /[\.](.{1,})/;

//commandLineArgument accepts an input argument from the command line.
//for example using the default {node index.js} call append on an argument {node index.js helloWorld}
const commandLineArgument = process.argv[2];

console.log(fileNames)
for (const fileName of fileNames){
  const name = fileName.match(lettersRegex) && fileName.match(lettersRegex)[0];
  const studentId = fileName.match(digitsRegex) && fileName.match(digitsRegex)[0];
  const fileType = fileName.match(fileTypeRegex)[0];
  if(name && studentId){
    let newFileName;
    if(commandLineArgument === "nameFirst"){
      newFileName = `${name}${studentId}${fileType}`
    } else if (commandLineArgument === "idFirst"){
      newFileName = `${studentId}${name}${fileType}`
    } else {
      //if no command or wrong command is given
      console.log("\nPlease enter a CL argument of nameFirst or idFirst.\nSyntax should be as follows:\n\nnode <file name> <command>");
      //then breakout to avoid renaming
      throw "Please enter a valid CL argument!!";
    }

    fs.renameSync(fileName, newFileName);
  }

}













// const fs = require("fs");

// const fileNames = fs.readdirSync("./");
// const digitsRegex = /\d{1,}/;
// const lettersRegex = /[a-zA-z]{1,}/;
// const fileTypeRegex = /[\u002E](.{1,})/;
// const commandLineArgument = process.argv[2];

// for (const fileName of fileNames) {
//   const name = fileName.match(lettersRegex) && fileName.match(lettersRegex)[0];
//   const studentId =
//     fileName.match(digitsRegex) && fileName.match(digitsRegex)[0];
//   const fileType = fileName.match(fileTypeRegex)[0];

//   if (name && studentId) {
//     let newFileName;

//     if (commandLineArgument === "nameFirst") {
//       newFileName = `${name}${studentId}${fileType}`;
//     } else if (commandLineArgument === "idFirst") {
//       newFileName = `${studentId}${name}${fileType}`;
//     } else {
//       throw "Please enter CL argument of nameFirst or idFirst";
//     }

//     fs.renameSync(fileName, newFileName);
//   }
// }
