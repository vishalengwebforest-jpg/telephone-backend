const multer = require("multer");
const { createWriteStream } = require("fs");
const path = require("path");
const fs = require("fs");

module.exports = {
  uploadImage: (req, res) => {
    return multer({
      fileFilter: (req, file, cb) => {
        const allowFileType = ["image/jpeg", "image/png"];
        if (allowFileType.includes(file.mimetype)) {
          cb(null, true);
        } else {
          const error = new Error("Only .jpeg and .png files are allowed!");
          error.status = 400; 
          cb(error, false);
        }
      },
    }); 
  },

  createImage: (dirName, buffer, imageName) => {
    console.log({ dirName, imageName });
    const dirPath = path.resolve(`./public/${dirName}`);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const write = createWriteStream(path.resolve(dirPath, imageName));
    write.write(buffer);
    write.end();
  },
};
