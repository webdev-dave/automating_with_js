//this script adds a watermark logo to all images in a given dir

const fs = require("fs");
const Jimp = require("jimp");
const probe = require("probe-image-size");

async function addLogoToImages(){
  const logoImage = await Jimp.read("./images/watermark_logo.png");
  const logoImageProperties = probe.sync(fs.readFileSync("./images/watermark_logo.png"));
  logoImage.opacity(0.5);

  const fileNamesArr = fs.readdirSync("./images/non_watermarked");
  for (const fileName of fileNamesArr){
    const image = await Jimp.read(`./images/non_watermarked/${fileName}`);
    const imageProperties = probe.sync(fs.readFileSync(`./images/non_watermarked/${fileName}`));

    const centerLogoOnX = () => ((imageProperties.width - logoImageProperties.width) / 2);
    const centerLogoOnY = () => ((imageProperties.height - logoImageProperties.height) / 2);
    
    
    console.log("resizing " + fileName);
    image.composite(logoImage, centerLogoOnX(), centerLogoOnY())
    console.log("adding watermark to filename");
    image.greyscale();
    console.log("adding grey scale effect");
    
    //Save the newly watermarked img
    const imageFileName = "watermarked_" + fileName;
    image.write("./images/watermarked/"+ imageFileName);
  }
}


addLogoToImages();








