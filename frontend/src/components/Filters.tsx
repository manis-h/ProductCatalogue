import { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';

type Category = { value: string; label: string; count: number };
type Brand = { value: string; label: string; count: number };
type Color = { value: string; label: string };
type PriceRange = { min: number; max: number };

interface FiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  brands: Brand[];
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  colors: Color[];
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  priceRange: PriceRange;
  selectedMin: number;
  selectedMax: number;
  onPriceChange: (min: number, max: number) => void;
}

const Filters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandChange,
  colors,
  selectedColors,
  onColorChange,
  priceRange,
  selectedMin,
  selectedMax,
  onPriceChange
}: FiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleCategory = (category:string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  const toggleBrand = (brand: string) => {
    const newBrands: string[] = selectedBrands.includes(brand)
      ? selectedBrands.filter((b: string) => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(newBrands);
  };

  const toggleColor = (color:string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    onColorChange(newColors);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md"
        >
          <span>Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Categories Filter */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.value}`}
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => toggleCategory(category.value)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`category-${category.value}`} className="ml-2 flex-1">
                  <span>{category.label}</span>
                  <span className="text-gray-500 text-sm ml-1">({category.count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Brands Filter */}
        <div>
          <h3 className="font-medium mb-3">Brands</h3>
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand.value}`}
                  checked={selectedBrands.includes(brand.value)}
                  onChange={() => toggleBrand(brand.value)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`brand-${brand.value}`} className="ml-2 flex-1">
                  <span>{brand.label}</span>
                  <span className="text-gray-500 text-sm ml-1">({brand.count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Colors Filter */}
        <div>
          <h3 className="font-medium mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <div key={color.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`color-${color.value}`}
                  checked={selectedColors.includes(color.value)}
                  onChange={() => toggleColor(color.value)}
                  className="sr-only"
                />
                <label
                  htmlFor={`color-${color.value}`}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColors.includes(color.value) ? 'border-blue-500' : 'border-gray-200'} flex items-center justify-center`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                >
                  {selectedColors.includes(color.value) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </label>
                <span className="sr-only">{color.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <PriceRangeSlider
            min={priceRange.min}
            max={1000}
            selectedMin={selectedMin}
            selectedMax={selectedMax}
            onChange={onPriceChange}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>£{selectedMin}</span>
            <span>£{selectedMax}</span>
            <span>£{1000}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;