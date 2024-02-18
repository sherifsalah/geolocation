// src/models/locationModel.js

// Importing the Knex.js library for database queries
import knex from 'knex';

// Importing the Knex configuration from the specified file
import config from '../config/knex.js';

// Creating a Knex instance using the specified configuration
const db = knex(config);

// Model for interacting with the 'locations' table in the database
const locationModel = {
  /**
   * Get a location by its ID from the 'locations' table.
   *
   * @param {number} id - The ID of the location to retrieve.
   * @returns {Promise<Object>} - A Promise that resolves with the retrieved location data.
   * @throws {Error} - If an error occurs while fetching the location.
   */
  async getLocationById(id) {
    try {
      return db('locations').where({ id }).first();
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching location: ${id}`);
    }
  },

  /**
   * Get all locations from the 'locations' table.
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of all locations.
   * @throws {Error} - If an error occurs while fetching locations.
   */
  async getAllLocations() {
    try {
      return db('locations').select('*');
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching locations');
    }
  },

  /**
   * Create a new location in the 'locations' table.
   *
   * @param {Object} data - The location data to be inserted.
   * @returns {Promise<Array<Object>>} - A Promise that resolves with the inserted location data.
   * @throws {Error} - If an error occurs while creating the location.
   */
  async createLocation(data) {
    try {
      return db('locations').insert(data).returning('*');
    } catch (error) {
      console.error(error);
      throw new Error('Error creating location');
    }
  },

  /**
   * Update a location in the 'locations' table by its ID.
   *
   * @param {number} id - The ID of the location to be updated.
   * @param {Object} data - The updated location data.
   * @returns {Promise<number>} - A Promise that resolves with the number of updated rows.
   * @throws {Error} - If an error occurs while updating the location.
   */
  async updateLocation(id, data) {
    try {
      return db('locations').where({ id }).update(data);
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating location: ${id}`);
    }
  },

  /**
   * Delete a location from the 'locations' table by its ID.
   *
   * @param {number} id - The ID of the location to be deleted.
   * @returns {Promise<number>} - A Promise that resolves with the number of deleted rows.
   * @throws {Error} - If an error occurs while deleting the location.
   */
  async deleteLocation(id) {
    try {
      return db('locations').where({ id: id }).del();
    } catch (error) {
      console.error(error);
      throw new Error(`Error deleting location: ${id}`);
    }
  },
};

// Export the locationModel for use in other modules
export default locationModel;
