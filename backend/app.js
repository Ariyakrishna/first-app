// Import required modules
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Environment variables for configuration
const dbHost = process.env.DB_HOST || 'db-1'; // Database host (default: Docker service name)
const dbPort = process.env.DB_PORT || 3306;   // Database port (default: 3306)
const dbUser = process.env.DB_USER || 'root'; // Database username
const dbPassword = process.env.DB_PASSWORD || 'password'; // Database password
const dbName = process.env.DB_NAME || 'my_database'; // Database name
const serverPort = process.env.PORT || 3000;  // Backend server port (default: 3000)

// Function to connect to the database with retry logic
function connectToDatabase(retries = 5) {
  console.log(`Attempting to connect to database at ${dbHost}:${dbPort}`);
  const connection = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });

  connection.connect((err) => {
    if (err) {
      console.error(`Error connecting to database: ${err.message}`);
      if (retries > 0) {
        console.log(`Retrying to connect... (${retries} attempts left)`);
        setTimeout(() => connectToDatabase(retries - 1), 5000); // Retry after 5 seconds
      } else {
        console.error('Exhausted all retries. Database connection failed.');
        process.exit(1); // Exit with error code
      }
    } else {
      console.log('Connected to the database successfully!');
    }
  });

  return connection;
}

// Initialize database connection
const dbConnection = connectToDatabase();

// Define a sample route for testing
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API route to test database connection
app.get('/api/test-db', (req, res) => {
  dbConnection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json({ solution: results[0].solution });
    }
  });
});

// Start the backend server
app.listen(serverPort, () => {
  console.log(`Backend server is running on port ${serverPort}`);
});
