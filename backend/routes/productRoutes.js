const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


// GET /api/products - Get products with filters
router.get('/', productsController.getProducts);
router.get('/product/:id', productsController.getProductById);

// POST /api/products/generate-mock-data - Generate mock data (dev only)
router.get('/generate-mock-data', productsController.generateMockData);

module.exports = router;