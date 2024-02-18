// Importing the pg (PostgreSQL) library for database connections
import pg from 'pg';

// Destructuring the Client class from the pg library
const { Client } = pg;

// Importing the dotenv module for loading environment variables
import dotenv from 'dotenv';

// Load environment variables from the specified .env file
dotenv.config({ path: '.env' });

// Creating a new PostgreSQL client instance with connection details from environment variables
const client = new Client({
  host: process.env.DB_HOST || '127.0.0.1', // Database host address, defaulting to '127.0.0.1'
  user: process.env.DB_USER || 'root', // Database user, defaulting to 'root'
  password: process.env.DB_PASSWORD || 'root', // Database password, defaulting to 'root'
  database: 'postgres', // Default PostgreSQL database name
  port: process.env.DB_PORT || 5432, // Database port, defaulting to 5432
});

/**
 * Asynchronous function to create a PostgreSQL database.
 */
async function createDB() {
  // Extracting the desired database name from environment variables, defaulting to 'geolocation'
  const db_name = process.env.DB_NAME || 'geolocation';

  try {
    console.log('Connecting to the PostgreSQL server...');
    // Establishing a connection to the PostgreSQL server
    await client.connect();
    console.log('Connected to the PostgreSQL server.');

    // Check if the specified database already exists
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${db_name}'`);

    if (result.rows.length === 0) {
      // Database does not exist, create it
      await client.query(`CREATE DATABASE ${db_name}`);
      console.log(`Database [${db_name}] created successfully!`);
    } else {
      console.log('Database already exists.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    // Closing the database connection, regardless of success or failure
    console.log('Ending connection to the PostgreSQL server...');
    await client.end();
  }
}

// Invoking the createDB function to initiate the database creation process
createDB();
