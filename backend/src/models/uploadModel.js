// src/models/uploadModel.js

// Importing necessary modules for file upload
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Getting the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuring multer storage options for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for storing uploaded files
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, path.parse(file.originalname).name + '-' + uniqueSuffix + path.parse(file.originalname).ext);
  },
});

// File size limit: 2MB
const fileSizeLimit = 2 * 1024 * 1024;

// File filter function to allow only specified file types (jpg and png)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpg|jpeg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg and png files are allowed!'), false);
  }
};

// Configuring multer for file upload with specified storage, file filter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: fileSizeLimit,
  },
});

// Exporting the configured multer instance for use in other modules
export { upload };
