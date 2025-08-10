# SpecsCart Project

SpecsCart is a comprehensive full-stack web application for managing and selling  products online. It features product browsing, inventory management, user authentication, and order processing. The project is organized into two main directories: `backend` and `frontend`, each with several subdirectories and files serving specific purposes.

# 1st Page
Product Listing/HomePage
With All the ProductList , Pagination Filters AndSorting ALso Search Bar with debounced Search
# 2nd Page
A detailed. Product Page Showcasing All Details of a Project


## Project Structure

```
SpecsCart/
├── backend/
│   ├── controllers/
│   │   └── productController.js  -Handles product-related logic
│   ├── middleware/
│   │   ├── authMiddleware.js    -Authentication middleware
│   │   └── errorHandler.js      -Error handling middleware
│   ├── models/
│   │   ├── Product.js           -Product schema/model
│   ├── routes/
│   │   └── productRoutes.js     -Product routes
│   ├── utils/
│   │   └── mockDataGenerator.js        - ToGenerateMockData
│   │   └── searchUtils.js        - Filter And Sort Queries
│   ├── .env                     - Environment variables
│   ├── app.js                   - Express app setup
│   ├── package.json             - Backend dependencies and scripts
│   └── server.js                - Entry point for backend server
├── frontend/
│   ├── public/
│   │   ├── index.html           - Main HTML file
│   │   └── favicon.ico          - Favicon
│   ├── src/
│   |   ├── store/
│   │   |   ├── prodductStore.ts -State Management/Zustand Store
│   │   ├── components/.         - All the Helping Components
│   │   ├── pages/
│   │   │   ├── ProdductListing.js        - Home page with all products andFilters
│   │   │   ├── ProductDetail.js       - Product detail page
│   │   ├── App.js               - Main React app component
│   │   ├── main.tsx             - Entry point for React app
│   ├── .env                     - Frontend environment variables
│   ├── package.json             - Frontend dependencies and scripts
└── README.md                    - Project documentation
```

## Backend
○ Mock Data Generation:  to generate a mock dataset of 500-1000
products to adequately test filtering and search performance.

A single primary API endpoint (e.g., GET /products) that supports:

■ Full-text search: Querying product names and descriptions by keyword. Case-
insensitivity should be supported.

■ Multi-faceted filtering: Filtering by multiple selected categories, brands, price
ranges (min/max), and other aflributes simultaneously.
■ Pagination: limit and offset (or page and pageSize) parameters to retrieve subsets
of results.
■ Sorting: sort_by (e.g., price, name, relevance) and sort_order (asc, desc)
parameters.
■ The list of products matching the applied criteria.
■ The total count
Metadata for dynamic facets:
## Frontend
# E-Commerce Product Listing Features

## Product Listing Page
- **Visual Product Display**  
  Products are displayed in a responsive grid view showing:
  - Product image
  - Name
  - Price
  - Rating (if available)

- **Pagination**  
  - Displays 12-24 products per page
  - Navigation controls:
    - Previous/Next buttons
    - Page number selection
    - Current page indicator

- **Sorting Options**  
  Users can sort by:
  - Price (Low → High / High → Low)
  - Name (A-Z / Z-A)
  - Relevance (when search is active)
  - Newest Arrivals

## Faceted Navigation
Dynamic filtering system with:

### Filter Types
1. **Categories**  
   - Multi-select capability (e.g., Electronics + Home & Kitchen)
   - Hierarchical display (parent/child categories)

2. **Brands**  
   - Multi-select capability
   - Alphabetical ordering

3. **Price Range**  
   - Interactive slider
   - Predefined ranges ($0-50, $50-100, $100+)

4. **Product Attributes**  
   - Color (with visual swatches)
   - Size (with availability indicators)
   - Material type
   - Memory capacity (for electronics)

### Filter Features
- Dynamic option availability (only shows relevant filters)
- Real-time product count per filter option
- Instant results updates without page reload
- Mobile-optimized filter drawer

## Search Functionality
- **Smart Search Bar**  
  - Full-text search across product names and descriptions
  - Type-ahead suggestions
  - Debounced input (300ms delay)

- **Search Results**  
  - Instant updates while typing
  - Highlighted matching terms
  - "No results" fallback UI

## Active Filters Display
- Clear visual indication of applied filters
- Individual filter removal (X buttons)
- "Clear All" functionality
- Filter count badge

## URL Management
- All parameters reflected in URL:
## How to Use

1. **Backend Setup:**
    - Navigate to `backend/`, install dependencies, and start the server. with npm run dev.
2. **Frontend Setup:**
    - Navigate to `frontend/`, install dependencies,  and start the development server.with npm run dev.



