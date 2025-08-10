type ActiveFiltersProps = {
  searchQuery: string;
  categories: string[];
  brands: string[];
  colors: string[];
  priceMin: number;
  maxPrice: number;
  onRemoveFilter: (filterType: string, value?: string) => void;
  onClearAll: () => void;
};

const ActiveFilters = ({
  searchQuery,
  categories,
  brands,
  colors,
  priceMin,
  maxPrice=1000,
  onRemoveFilter,
  onClearAll
}: ActiveFiltersProps) => {
  const hasPriceFilter = priceMin > 0 || maxPrice < 1000;
  const hasFilters = searchQuery || categories.length > 0 || brands.length > 0 || colors.length > 0 || hasPriceFilter;

  if (!hasFilters) return null;

  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Filters:</span>
        
        {searchQuery && (
          <div className="flex items-center bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
            <span className="mr-1">Search: "{searchQuery}"</span>
            <button
              onClick={() => onRemoveFilter('search')}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {categories.map(category => (
          <div key={category} className="flex items-center bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
            <span className="mr-1">Category: {category}</span>
            <button
              onClick={() => onRemoveFilter('category', category)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {brands.map(brand => (
          <div key={brand} className="flex items-center bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
            <span className="mr-1">Brand: {brand}</span>
            <button
              onClick={() => onRemoveFilter('brand', brand)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {colors.map(color => (
          <div key={color} className="flex items-center bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
            <span className="mr-1">Color: {color}</span>
            <button
              onClick={() => onRemoveFilter('color', color)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {hasPriceFilter && (
          <div className="flex items-center bg-white px-2 py-1 rounded-full text-sm border border-gray-200">
            <span className="mr-1">Price: ${priceMin} - ${maxPrice}</span>
            <button
              onClick={() => onRemoveFilter('price')}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <button
          onClick={onClearAll}
          className="ml-auto text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;