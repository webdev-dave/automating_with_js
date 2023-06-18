const fs = require("fs");
const fileNames = fs.readdirSync("./sampleFiles");

//commandLineArgument accepts an input argument from the command line.
//for example using the default {node index.js} call append on an argument {node index.js helloWorld}
const commandLineArgument = process.argv[2];

const digitsRegex = /\d+/;
const lettersRegex = /([^\d\.\-_]+|[\.\-_])/g;
const fileTypeRegex = /\.[^\s\.]+$/;


for (const fileName of fileNames) {
  //name includes all characters except for numbers (including: -||_||.)
  //StudentIdNumber never includes any characters other than numbers
  const name = fileName.match(lettersRegex) && fileName.match(lettersRegex);
  let joinedName = name.slice(0, -2).join("").replace(" ", "-");
  const fileType =
    fileName.match(fileTypeRegex) && fileName.match(fileTypeRegex)[0];
  const studentIdNumber =
    fileName.match(digitsRegex) && fileName.match(digitsRegex)[0];

  //if name currently starts or ends with decimal, dash or underscore (aka - divChars) then remove them
  const startsWithDivChars = /^[\.\-_]+/;
  const endsWithDivChars = /[\.\-_]+$/;
  if (joinedName.match(startsWithDivChars)) {
    joinedName = joinedName.replace(startsWithDivChars, "");
  }
  if (joinedName.match(endsWithDivChars)) {
    joinedName = joinedName.replace(endsWithDivChars, "");
  }

  if (name && studentIdNumber) {
    let newFileName;
    if (commandLineArgument === "nameFirst") {
      newFileName = `${joinedName}-${studentIdNumber}${fileType}`;
    } else if (commandLineArgument === "idFirst") {
      newFileName = `${studentIdNumber}-${joinedName}${fileType}`;
    } else {
      //if no command or wrong command is given
      console.log(
        "\nPlease enter a CL argument of nameFirst or idFirst.\nSyntax should be as follows:\n\nnode <file name> <command>"
      );
      //then breakout to avoid renaming
      throw "Please enter a valid CL argument!!";
    }

    if(fileName !== newFileName){
      console.log("renamed: ",fileName,"to: ", newFileName);
      fs.renameSync(`./sampleFiles/${fileName}`, `./sampleFiles/${newFileName}`);
    } else {
      console.log("no changes necessary for file named: ", fileName);
    }
  }
}
