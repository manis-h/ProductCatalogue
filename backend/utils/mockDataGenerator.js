const { faker } = require('@faker-js/faker');
const Product = require('../models/Product');

const categories = [
  'Electronics', 'Computers', 'Smartphones', 'TV', 'Cameras',
  'Clothing', 'Men', 'Women', 'Kids', 'Shoes',
  'Home', 'Kitchen', 'Furniture', 'Bedding', 'Bath',
  'Sports', 'Outdoors', 'Fitness', 'Cycling', 'Team Sports'
];

const brands = [
  'Apple', 'Samsung', 'Sony', 'LG', 'Panasonic',
  'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok',
  'KitchenAid', 'Cuisinart', 'All-Clad', 'Calphalon', 'Pyrex',
  'Wilson', 'Spalding', 'Nike', 'Adidas', 'Under Armour'
];

const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Silver', 'Gold'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const materials = ['Cotton', 'Polyester', 'Leather', 'Silk', 'Wool'];

async function generateMockData(count) {
  // Clear existing data
  await Product.deleteMany({});
  
  const products = [];

  for (let i = 0; i < count; i++) {
    const categoryCount = faker.datatype.number({ min: 1, max: 3 });
    const productCategories = faker.helpers.arrayElements(categories, categoryCount);

    // Determine product type based on categories
    const isElectronics = productCategories.some(cat => 
      ['Electronics', 'Computers', 'Smartphones', 'TV', 'Cameras'].includes(cat));
    const isClothing = productCategories.some(cat => 
      ['Clothing', 'Men', 'Women', 'Kids', 'Shoes'].includes(cat));
    const isHome = productCategories.some(cat => 
      ['Home', 'Kitchen', 'Furniture', 'Bedding', 'Bath'].includes(cat));
    const isSports = productCategories.some(cat => 
      ['Sports', 'Outdoors', 'Fitness', 'Cycling', 'Team Sports'].includes(cat));

    // Generate appropriate attributes
    const attributes = {};
    
    if (isElectronics) {
      attributes.screenSize = faker.helpers.arrayElement(['13"', '15"', '17"', '24"', '32"', '55"']);
      attributes.storage = faker.helpers.arrayElement(['128GB', '256GB', '512GB', '1TB']);
      attributes.color = faker.helpers.arrayElement(colors);
    } else if (isClothing) {
      attributes.size = faker.helpers.arrayElement(sizes);
      attributes.color = faker.helpers.arrayElement(colors);
      attributes.material = faker.helpers.arrayElement(materials);
    } else if (isHome) {
      attributes.color = faker.helpers.arrayElement(colors);
      attributes.material = faker.helpers.arrayElement([...materials, 'Wood', 'Metal', 'Glass']);
    } else if (isSports) {
      attributes.size = faker.helpers.arrayElement([...sizes, 'One Size']);
      attributes.color = faker.helpers.arrayElement(colors);
    }

    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 2000 })),
      imageUrl: faker.image.imageUrl(640, 480, 'product', true),
      categories: productCategories,
      brand: faker.helpers.arrayElement(brands),
      attributes,
      stock: faker.datatype.number({ min: 0, max: 100 }),
      averageRating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    });
  }

  await Product.insertMany(products);
  console.log(`Generated ${count} mock products`);
}


module.exports = generateMockData;