// src/config/knexfile.js

// Importing the dotenv module for loading environment variables
import dotenv from 'dotenv';

// Load environment variables from the specified .env file
dotenv.config({ path: '../../.env' });

// Configuration object for the Knex.js database connection
export default {
  // Specify the database client (PostgreSQL in this case)
  client: 'pg',

  // Connection details for the PostgreSQL database
  connection: {
    host: process.env.DB_HOST || '127.0.0.1', // Database host address, defaulting to '127.0.0.1'
    user: process.env.DB_USER || 'root', // Database user, defaulting to 'root'
    password: process.env.DB_PASSWORD || 'root', // Database password, defaulting to 'root'
    database: process.env.DB_NAME || 'geolocation', // Database name, defaulting to 'geolocation'
  },

  // Configuration for handling database migrations
  migrations: {
    tableName: 'migrations', // Specify the name of the migrations table
    directory: '../migrations', // Specify the directory where migration files are located
  },
};
