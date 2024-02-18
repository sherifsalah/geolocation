// src/controllers/uploadController.js

// Importing the session module for managing session data
import session from '../session.js';

/**
 * Handle file upload
 * @param {Object} req - Express request object with file data
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or error
 */
const uploadFile = async (req, res) => {
  try {
    // Check if a file was included in the request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Define the base URL for file access
    const baseUrl = 'http://localhost:3000';
    // Construct the complete file URL based on the uploaded file's filename
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    // Store the last uploaded file URL in the session for later use
    session.getSession().lastUploadedFileUrl = fileUrl;

    // Send a JSON response indicating successful file upload
    res.json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    // Handle any errors that occur during file upload
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the uploadFile function for use in other modules
export { uploadFile };
