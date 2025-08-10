import { useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ActiveFilters from '../components/ActiveFilters';
import SortDropdown from '../components/SortDropDown';
import axios from 'axios';
import useProductStore from '../store/productStore';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    products,
    loading,
    totalProducts,
    availableFilters,
    filters,
    setProducts,
    setLoading,
    setTotalProducts,
    setAvailableFilters,
    updateFilters,
    clearFilters
  } = useProductStore();

  // Initialize filters from URL
  useEffect(() => {
    const initialFilters = {
      page: parseInt(searchParams.get('page') || '1') || 1,
      search: searchParams.get('search') || '',
      categories: searchParams.get('categories')?.split(',') || [],
      brands: searchParams.get('brands')?.split(',') || [],
      colors: searchParams.get('colors')?.split(',') || [],
      priceMin: parseInt(searchParams.get('priceMin') || '0') || 0,
      maxPrice: parseInt(searchParams.get('maxPrice') || '1000') || 1000,
      sort: searchParams.get('sort') || 'relevance'
    };
    updateFilters(initialFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (filters.search) params.set('search', filters.search);
      if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
      if (filters.brands.length > 0) params.set('brands', filters.brands.join(','));
      if (filters.colors.length > 0) params.set('colors', filters.colors.join(','));
      if (filters.priceMin > 0) params.set('priceMin', filters.priceMin.toString());
      if (filters.maxPrice < 1000) params.set('maxPrice', filters.maxPrice.toString());
      if (filters.sort !== 'relevance') params.set('sort', filters.sort);
      if (filters.page > 1) params.set('page', filters.page.toString());

      window.history.replaceState(null, '', `?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      updateFilters({ search: query });
    }, 500),
    [updateFilters]
  );

  // Handle search with debounce
  const handleSearch = useCallback((query: string) => {
    updateFilters({ search: query, page: 1 });
    debouncedSearch(query);
  }, [debouncedSearch, updateFilters]);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/products', {
          params: {
            search: filters.search,
            categories: filters.categories.join(','),
            brands: filters.brands.join(','),
            colors: filters.colors.join(','),
            priceMin: filters.priceMin,
            maxPrice: filters.maxPrice,
            page: filters.page,
            limit: 12,
            sort: filters.sort === 'relevance' ? undefined : filters.sort,
          }
        });
    
        const mappedProducts = response.data.data.products.map((product: any) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.categories[0] || '',
          brand: product.brand,
          colors: product.attributes?.color ? [product.attributes.color] : [],
          image: product.imageUrl,
          rating: product.averageRating,
          reviewCount: 0
        }));
    
        const mappedFilters = {
          categories: response.data.data.facets.categories.map((cat: any) => ({
            value: cat._id,
            label: cat._id,
            count: cat.count
          })),
          brands: response.data.data.facets.brands.map((brand: any) => ({
            value: brand._id,
            label: brand._id,
            count: brand.count
          })),
          colors: [],
          priceRange: response.data.data.facets.priceRange
        };
    
        setProducts(mappedProducts);
        setTotalProducts(response.data.data.total);
        setAvailableFilters(mappedFilters);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, setProducts, setTotalProducts, setAvailableFilters, setLoading]);

  // Filter handlers
  const handleCategoryChange = useCallback((selectedCategories: string[]) => {
    updateFilters({ categories: selectedCategories });
  }, [updateFilters]);

  const handleBrandChange = useCallback((selectedBrands: string[]) => {
    updateFilters({ brands: selectedBrands });
  }, [updateFilters]);

  const handleColorChange = useCallback((selectedColors: string[]) => {
    updateFilters({ colors: selectedColors });
  }, [updateFilters]);

  const handlePriceChange = useCallback((min: number, max: number) => {
    updateFilters({ priceMin: min, maxPrice: max });
  }, [updateFilters]);

  const handleSortChange = useCallback((sortOption: string) => {
    updateFilters({ sort: sortOption });
  }, [updateFilters]);

  const handlePageChange = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  const handleRemoveFilter = useCallback((filterType: string, value?: string) => {
    switch (filterType) {
      case 'category':
        updateFilters({ categories: filters.categories.filter((cat: string) => cat !== value) });
        break;
      case 'brand':
        updateFilters({ brands: filters.brands.filter((brand: string) => brand !== value) });
        break;
      case 'color':
        updateFilters({ colors: filters.colors.filter(color => color !== value) });
        break;
      case 'price':
        updateFilters({ priceMin: 0, maxPrice: 1000 });
        break;
      case 'search':
        updateFilters({ search: '' });
        break;
      default:
        break;
    }
  }, [filters, updateFilters]);

  const activeFiltersCount = 
    (filters.search ? 1 : 0) + 
    filters.categories.length + 
    filters.brands.length + 
    filters.colors.length + 
    (filters.priceMin > 0 || filters.maxPrice < 1000 ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <Filters
            categories={availableFilters.categories.map((cat: any) => ({
              value: cat.value ?? cat._id,
              label: cat.label ?? cat._id,
              count: cat.count
            }))}
            selectedCategories={filters.categories}
            onCategoryChange={handleCategoryChange}
            brands={availableFilters.brands.map((brand: any) => ({
              value: brand.value ?? brand._id,
              label: brand.label ?? brand._id,
              count: brand.count
            }))}
            selectedBrands={filters.brands}
            onBrandChange={handleBrandChange}
            colors={availableFilters.colors.map((color: any) => ({
              value: color.value ?? color._id,
              label: color.label ?? color._id,
              count: color.count
            }))}
            selectedColors={filters.colors}
            onColorChange={handleColorChange}
            priceRange={availableFilters.priceRange}
            selectedMin={filters.priceMin}
            selectedMax={filters.maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <SearchBar 
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="mb-4">
              <ActiveFilters
                searchQuery={filters.search}
                categories={filters.categories}
                brands={filters.brands}
                colors={filters.colors}
                priceMin={filters.priceMin}
                maxPrice={filters.maxPrice}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={clearFilters}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
            </div>
            <SortDropdown 
              currentSort={filters.sort}
              onChange={handleSortChange}
            />
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product?._id} 
                    product={product}
                    onClick={() => navigate(`/products/${product._id}`)}
                  />
                ))}
              </div>
              
              <div className="mt-8">
                <Pagination
                  currentPage={filters.page}
                  totalItems={totalProducts}
                  itemsPerPage={12}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;