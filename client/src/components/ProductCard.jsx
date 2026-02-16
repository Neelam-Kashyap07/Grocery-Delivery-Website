import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  // Helper function for images
  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http")
      ? img
      : `http://localhost:5000/images/${img}`;
  };

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-300 rounded-md px-4 py-3 bg-white min-w-56 max-w-56 w-full shadow-sm hover:shadow-md transition"
      >
        {/* Product Image */}
        <div className="flex items-center justify-center mb-3 bg-white h-36">
  <img
    className="w-28 h-28 object-contain"
    src={getImageUrl(product.image[0])}
    alt={product.name}
  />
</div>


        {/* Product Info */}
        <div className="text-sm text-gray-600">
          <p className="text-xs uppercase tracking-wide">
            {product.category}
          </p>

          <p className="text-gray-800 font-semibold text-lg truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-4"
                />
              ))}
            <p className="text-sm">(4)</p>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold text-indigo-600">
              ₹{product.price}
            </p>

            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems?.[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center gap-1 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded text-indigo-700 font-medium hover:bg-indigo-200"
                >
                  <img src={assets.cart_icon} alt="cart" className="w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-indigo-200 rounded px-2 py-1">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="font-bold px-2"
                  >
                    −
                  </button>

                  <span>{cartItems[product._id]}</span>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="font-bold px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
