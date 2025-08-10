import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/20/solid';

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
    [key: string]: any;
  };
  stock: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/products/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Product not found
        </div>
      </div>
    );
  }

  // Render star rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.averageRating);
    const hasHalfStar = product.averageRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center mt-1">
        {stars}
        <span className="text-gray-600 ml-2">({product.averageRating.toFixed(1)})</span>
      </div>
    );
  };

  // Render attributes
  const renderAttributes = () => {
    return Object.entries(product.attributes).map(([key, value]) => (
      <div key={key} className="flex py-2 border-b border-gray-200">
        <span className="text-gray-600 font-medium capitalize w-32">{key}:</span>
        <span className="text-gray-900 capitalize">{value}</span>
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 lg:w-2/5">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
            src='https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/midnight-blue-full-rim-square-lenskart-hustlr-la-e15417-xw-c36-eyeglasses_219072_2_15_02_2025.png'
            //   src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 lg:w-3/5">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Brand */}
            <p className="text-lg text-gray-600 mb-4">Brand: {product.brand}</p>

            {/* Rating */}
            {renderRating()}

            {/* Price */}
            <div className="mt-6">
              <p className="text-3xl font-bold text-gray-900">
                £{product.price.toFixed(2)}
              </p>
              {product.stock > 0 ? (
                <p className="text-green-600 mt-1">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-600 mt-1">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Attributes */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
              <div className="mt-2">
                {renderAttributes()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors"
              >
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <span>Product ID: {product._id}</span>
                <span className="mx-2">•</span>
                <span>Added on {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;