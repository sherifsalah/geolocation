// src/controllers/locationController.js

// Importing required modules
import Joi from 'joi';
import locationModel from '../models/locationModel.js';
import session from '../session.js';

// Define a schema for location data validation
const locationSchema = Joi.object({
  title: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

// Controller for managing location-related operations
const locationController = {
  /**
   * Get location by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response with location data or error message
   */
  async getLocationById(req, res) {
    try {
      const { id } = req.params;

      // Retrieve location by ID from the model
      const location = await locationModel.getLocationById(id);

      // Check if the location exists and send the response accordingly
      if (location) {
        res.json(location);
      } else {
        res.status(404).json({ error: 'Location not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  /**
   * Get all locations
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response with all locations or error message
   */
  async getAllLocations(req, res) {
    try {
      // Retrieve all locations from the model
      const locations = await locationModel.getAllLocations();
      res.json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  /**
   * Create a new location
   * @param {Object} req - Express request object with location data in the body
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response indicating success or error
   */
  async createLocation(req, res) {
    try {
      const data = req.body;

      // Validate location data using Joi schema
      const { error } = locationSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Attach the last uploaded image url to the location data
      req.body.image = session.getSession().lastUploadedFileUrl;

      // Check if the image URL is available
      if (!req.body.image) {
        return res.status(500).json({ error: 'Image not found' });
      }

      // Create a new location using the model
      const [location] = await locationModel.createLocation(req.body);
      res.status(201).json({
        status: 'Location created successfully',
        location: location,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  /**
   * Update location by ID
   * @param {Object} req - Express request object with location data in the body
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response indicating success or error
   */
  async updateLocation(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Validate location data using Joi schema
      const { error } = locationSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Update location data using the model
      const updatedRows = await locationModel.updateLocation(id, data);

      // Check if the location was updated successfully and send the response accordingly
      if (updatedRows > 0) {
        res.json({ status: 'Location updated successfully' });
      } else {
        res.status(404).json({ error: 'Location not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  /**
   * Delete location by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - JSON response indicating success or error
   */
  async deleteLocation(req, res) {
    try {
      const locationId = req.params.id;

      // Delete location using the model
      const deletedRowCount = await locationModel.deleteLocation(locationId);

      // Check if the location was deleted successfully and send the response accordingly
      if (deletedRowCount > 0) {
        return res.json({ status: 'Location deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Location not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

// Export the locationController for use in other modules
export default locationController;
