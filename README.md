# GEOLocations App

## Introduction

Welcome to the GEOLocations App! This project allows you to manage and visualize geolocations, including their titles, images, and coordinates. Follow the instructions below to set up and run the application.

## Prerequisites

Ensure that you have the following installed on your machine:

- PostgreSQL database version 16 or higher
- Node.js version 20 or higher

## Installation

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/sherifsalah/geolocation.git
   cd geolocation
   ```

2. Create a `.env` file in the `backend` directory and set up the PostgreSQL database configuration:

   ```env
   # backend/.env

   # PostgreSQL Database Configuration
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=geolocation
   DB_PORT=your-db-port
   ```

3. Install dependencies and set up the database.

   ```bash
   npm run init
   ```

   This command will navigate to the backend directory, install backend dependencies, run the bootstrap script to create the necessary directories, install frontend dependencies, and set up the database migrations.

## Database Configuration

Make sure you have a PostgreSQL database set up. Update the database configuration in `backend/config/knex.js` with your PostgreSQL credentials:

```javascript
// backend/config/knex.js

// ...

connection: {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'geolocation',
},

// ...
```
## Running the Application

To start both the backend and frontend servers concurrently, run:

```bash
npm start
```

This command uses `concurrently` to run the backend and frontend servers simultaneously.

- Backend server runs on `http://localhost:3000`.
- Frontend server runs on `http://localhost:8080`.

Visit `http://localhost:8080` in your browser to access the GEOLocations App.

## Additional Scripts

- To start only the backend server:

```bash
npm run start:backend
```

- To start only the frontend server:

```bash
npm run start:frontend
```

## Author

- **sherifsalah**

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.