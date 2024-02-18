// src/routes/uploadRoutes.js

// Importing the Express framework, file upload controller, and file upload model
import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { upload } from '../models/uploadModel.js';

// Creating an Express Router instance
const router = express.Router();

// Define a route for handling file uploads
router.post('/', upload.single('file'), uploadFile);

// Exporting the router for use in other modules
export default router;
