const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

const validateProduct = (req, res, next) => {
  const { price } = req.body;
  
  if (price === undefined || price === null) {
    return res.status(400).json({ 
      success: false, 
      message: 'Price is required' 
    });
  }

  if (typeof price !== 'number' || isNaN(price)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Price must be a valid number' 
    });
  }

  next();
};

// GET /api/products - Get products with filters
router.get('/', productsController.getProducts);
router.get('/product/:id', productsController.getProductById);

// POST /api/products/generate-mock-data - Generate mock data (dev only)
router.get('/generate-mock-data', productsController.generateMockData);

module.exports = router;