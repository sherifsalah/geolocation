// src/app.js

// Importing necessary modules for creating an Express app
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Importing route modules for locations and file uploads
import locationRoutes from './routes/locationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Creating an Express app instance
const app = express();

// Setting the port for the server to listen on (default: 3000)
const port = process.env.PORT || 3000;

// Adding middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Adding middleware for parsing JSON data in the request body
app.use(bodyParser.json());

// Serving uploaded files from the /uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Running...'); // Send a simple response for the root endpoint
});

// Using location routes defined in locationRoutes.js
app.use('/api/location', locationRoutes);

// Using file upload routes defined in uploadRoutes.js
app.use('/api/upload', uploadRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
