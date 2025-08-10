function buildFilterQuery(options) {
  const query = {};

  // Text search
  if (options.search) {
    query.$text = { $search: options.search };
  }

  // Categories filter
  if (options.categories) {
    const categoryList = options.categories.split(',');
    query.categories = { $in: categoryList };
  }

  // Brands filter
  if (options.brands) {
    const brandList = options.brands.split(',');
    query.brand = { $in: brandList };
  }

  // Price range - FIXED VERSION
  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    query.price = {};
    
    if (options.minPrice !== undefined && !isNaN(options.minPrice)) {
      query.price.$gte = parseFloat(options.minPrice);
    }
    
    if (options.maxPrice !== undefined && !isNaN(options.maxPrice)) {
      query.price.$lte = parseFloat(options.maxPrice);
    }
    
    // If we ended up with an empty price object, remove it
    if (Object.keys(query.price).length === 0) {
      delete query.price;
    }
  }

  // Dynamic attributes
  if (options.attributes) {
    try {
      const attributes = JSON.parse(options.attributes);
      for (const [key, value] of Object.entries(attributes)) {
        if (Array.isArray(value)) {
          query[`attributes.${key}`] = { $in: value };
        } else {
          query[`attributes.${key}`] = value;
        }
      }
    } catch (e) {
      console.error('Error parsing attributes:', e);
    }
  }

  return query;
}

function buildSortQuery(sortValue) {
  const sort = {};
  
  switch(sortValue) {
    case 'price_asc':
      sort.price = 1; // Ascending price
      break;
    case 'price_desc':
      sort.price = -1; // Descending price
      break;
    case 'name_asc':
      sort.name = 1; // A-Z
      break;
    case 'name_desc':
      sort.name = -1; // Z-A
      break;
    case 'relevance':
    default:
     
        sort.createdAt = -1; // Default fallback
     
  }
  
  return sort;
}
module.exports = {
  buildFilterQuery,
  buildSortQuery
};