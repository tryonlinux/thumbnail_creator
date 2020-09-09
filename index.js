const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

var filepath;
const convertToThumbnail = async function(filepath,filename){
  
    var safeFileName = path.normalize(filename).replace(/[^a-z0-9]/gi, "-");
    await sharp(path.join(filepath,filename))
    .resize(640, 427, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .png()
    .toFile(
      path.join(
        filepath,
        "thumb.quickview." + safeFileName + ".png"
      )
    );
}

const getAllFiles = async function(filepath){
    return  await fs.readdirSync(filepath);
}

filepath = process.argv[2];
getAllFiles(filepath).then(files =>{
    files.forEach(filename => {
      if(!filename.includes("thumb.quickview.")){
        convertToThumbnail(filepath,filename)
      }
    });
})
