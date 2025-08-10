import { create } from 'zustand';

interface ProductState {
  products: Product[];
  loading: boolean;
  totalProducts: number;
  availableFilters: AvailableFilters;
  filters: FiltersState;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setTotalProducts: (total: number) => void;
  setAvailableFilters: (filters: AvailableFilters) => void;
  updateFilters: (newFilters: Partial<FiltersState>) => void;
  clearFilters: () => void;
}

 const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: true,
  totalProducts: 0,
  availableFilters: {
    categories: [],
    brands: [],
    colors: [],
    priceRange: { min: 0, max: 1000 }
  },
  filters: {
    page: 1,
    search: '',
    categories: [],
    brands: [],
    colors: [],
    priceMin: 0,
    maxPrice: 1000,
    sort: 'relevance'
  },
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setTotalProducts: (totalProducts) => set({ totalProducts }),
  setAvailableFilters: (availableFilters) => set({ availableFilters }),
  updateFilters: (newFilters) => set((state) => ({
    filters: {
      ...state.filters,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 
            (Object.keys(newFilters).length > 1 ? 1 : state.filters.page)
    }
  })),
  clearFilters: () => set({
    filters: {
      page: 1,
      search: '',
      categories: [],
      brands: [],
      colors: [],
      priceMin: 0,
      maxPrice: 1000,
      sort: 'relevance'
    }
  })
}));
export default useProductStore;
//Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  brand: string;
  attributes: {
    color?: string;
    material?: string;
    screenSize?: string;
    storage?: string;
    size?: string;
    [key: string]: any;
  };
  stock: number;
  averageRating: number;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Facet {
  _id: string;
  count: number;
}

export interface AvailableFilters {
  categories: Facet[];
  brands: Facet[];
  colors: Facet[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface FiltersState {
  page: number;
  search: string;
  categories: string[];
  brands: string[];
  colors: string[];
  priceMin: number;
  maxPrice: number;
  sort: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    products: Product[];
    total: number;
    page: number;
    pages: number;
    facets: {
      categories: Facet[];
      brands: Facet[];
      priceRange: {
        min: number;
        max: number;
      };
    };
  };
}