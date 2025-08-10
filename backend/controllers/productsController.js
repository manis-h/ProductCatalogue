const Product = require('../models/Product');
const { buildFilterQuery, buildSortQuery } = require('../utils/searchUtils');
const generateMockData = require('../utils/mockDataGenerator');

exports.getProducts = async (req, res) => {
  try {
    const { 
      search,
      categories,
      brands,
      minPrice,
      maxPrice,
      attributes,
      page = 1,
      limit = 12,
      sort = 'relevance',
      sortOrder = 'asc'
    } = req.query;
    // Convert and validate query params
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit) || 12));
    
    // Parse price values safely
    const minPriceNumber = minPrice && !isNaN(minPrice) ? parseFloat(minPrice) : undefined;
    const maxPriceNumber = maxPrice && !isNaN(maxPrice) ? parseFloat(maxPrice) : undefined;

    // Build filter query
    const filterQuery = buildFilterQuery({
      search,
      categories,
      brands,
      minPrice: minPriceNumber,
      maxPrice: maxPriceNumber,
      attributes,
    });

    console.log('Final filter query:', filterQuery);

    // Build sort query
    const sortQuery = buildSortQuery(sort, sortOrder);

    // Get products and facets
    const [products, total, categoriesFacet, brandsFacet, priceRangeFacet] = await Promise.all([
      Product.find(filterQuery)
        .sort(sortQuery)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Product.countDocuments(filterQuery),
      Product.aggregate([
        { $match: filterQuery },
        { $unwind: '$categories' },
        { $group: { _id: '$categories', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Product.aggregate([
        { $match: filterQuery },
        { $group: { _id: '$brand', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Product.aggregate([
        { $match: filterQuery },
        { $group: { 
          _id: null, 
          min: { $min: '$price' },
          max: { $max: '$price' }
        } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        products,
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
        facets: {
          categories: categoriesFacet,
          brands: brandsFacet,
          priceRange: priceRangeFacet[0] || { min: 0, max: 0 },
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.generateMockData = async (req, res) => {
  try {
    await generateMockData(1000);
    res.json({ 
      success: true, 
      message: 'Generated 1000 mock products' 
    });
  } catch (error) {
    console.error('Error generating mock data:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required' 
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};