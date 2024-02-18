// src/routes/locationRoutes.js

// Importing the Express framework and the location controller
import express from 'express';
import locationController from '../controllers/locationController.js';

// Creating an Express Router instance
const router = express.Router();

// Define routes for handling location-related operations
router.get('/all', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/create', locationController.createLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

// Exporting the router for use in other modules
export default router;
