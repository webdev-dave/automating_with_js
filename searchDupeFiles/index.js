const walk = require("walk");
const path = require("path");

const fileNameSizeCount = {}; // {size: path}

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

      if (size in fileNameSizeCount) {
        console.log("Duplicate files found:");
        console.log(p);
        console.log(fileNameSizeCount[size]);
        console.log("\n");
      } else {
        fileNameSizeCount[size] = p;
      }

      next();
    },
  },
};

walk.walkSync("./", options);
console.log("all done");
