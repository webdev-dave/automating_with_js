const fs = require("fs");
const Jimp = require("jimp");

const squareSize = 500;

async function addLogoToImages() {
  const logoImage = await Jimp.read("./images/propertyofkevin.png");
  logoImage.opacity(0.5);

  const arrFileNames = fs.readdirSync("./images/non_watermarked");
  for (const fileName of arrFileNames) {
    const image = await Jimp.read(`./images/non_watermarked/${fileName}`);

    image.resize(squareSize, squareSize);
    console.log("Resizing " + fileName);

    image.composite(logoImage, squareSize / 2, squareSize / 2);
    console.log("Adding logo to " + fileName);

    image.grayscale();
    console.log("gray scaling " + fileName);

    const imageFileName = "watermarked_" + fileName;
    image.write("./images/watermarked/" + imageFileName);
  }
}

addLogoToImages();
