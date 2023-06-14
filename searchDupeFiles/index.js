// This script finds all duplicate files and gives a warning in the console (duplicate as in duplicate file contents).

const walk = require("walk");
const path = require("path");
const fs = require("fs");

//we find potential duplicates by searching all files to see if any have a matching total character count.
const fileNameSizeCount = {}; //{size: [path, path, path, ...]};

const options = {
  listeners: {
    names: function (root, nodeNamesArray) {
      nodeNamesArray.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
    },

    file: function (root, fileStats, next) {
      const name = fileStats.name;
      const size = fileStats.size;
      const p = path.join(__dirname, root.slice(2), name);

      //console.log(root.slice(2), name);

      if (size in fileNameSizeCount) {
        //console.log(localPath);
        const currentFileContents = fs.readFileSync(p, "utf8");

        //potentialMatches is an array of all matching filePaths (p);
        const potentialMatches = fileNameSizeCount[size];
        potentialMatches.forEach((potentialMatchPath) => {
          const potentialMatchFileContents = fs.readFileSync(
            potentialMatchPath,
            "utf8"
          );
          if (potentialMatchFileContents === currentFileContents) {
            console.log("duplicate file found!!");
            console.log("\n", "this file: ");
            console.log(p);
            console.log("\n", "matches with the file below: ");
            console.log(potentialMatchPath);
          } else {
            //if the current files contents' size are the same but aren't a match then add current file to fileNameSizeCount[size] array.
            fileNameSizeCount[size] = [...fileNameSizeCount[size], p];
          }
        });
      } else {
        //if no duplicate files found then create a new paths array and add current file p (path) to the fileNameSizeCount Obj
        fileNameSizeCount[size] = [p];
      }
      next();
    },
  },
};

walk.walkSync("./", options);

console.log("all done");