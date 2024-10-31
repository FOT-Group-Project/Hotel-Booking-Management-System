const multer = require("multer");
const path = require("path");

// Function to set storage configuration dynamically
const dynamicStorage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const basePath = "./uploads";
      const finalPath = path.join(basePath, folder);
      cb(null, finalPath);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + path.extname(file.originalname)); // Ensuring unique file names
    },
  });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Exporting a function to get uploader with specific folder
const getUploader = (folder) =>
  multer({
    storage: dynamicStorage(folder),
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter,
  });

module.exports = {
  getUploader: getUploader,
};
