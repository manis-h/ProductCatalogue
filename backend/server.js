require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const productsRouter = require("./routes/productRoutes");

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/productdb";
console.log({MONGO_URI})

require('dotenv').config();



const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the SpecsCart API');
});
mongoose
.connect(MONGO_URI, { dbName: "productdb" })
.then(() => console.log("Mongo connected"))
.catch((err) => {
  console.error("Mongo connection error:", err);
  process.exit(1);
});
  app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  // Middleware
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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something broke!' 
  });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;