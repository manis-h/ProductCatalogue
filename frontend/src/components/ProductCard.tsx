type Product = {
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
};

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative pb-[100%] bg-gray-100">
        <img
        src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/midnight-blue-full-rim-square-air-essentials-la-e15417-w-c3-eyeglasses_g_7844pp.jpg"
        //   src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold">£{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-1">
              {product.rating} 
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;