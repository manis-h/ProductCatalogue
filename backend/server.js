require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const productsRouter = require("./routes/productRoutes");

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/productdb";

mongoose
  .connect(MONGO_URI, { dbName: "productdb" })
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

const { Sequelize } = require('sequelize');
const { con } = require("./sql");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres', // Change this to 'mysql', 'sqlite', 'mssql' as needed
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      // For SSL configuration if needed
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false
      // }
    }
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something broke!' 
  });
});
con()
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});