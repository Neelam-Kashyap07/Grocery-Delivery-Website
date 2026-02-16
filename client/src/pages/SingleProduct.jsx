import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // ✅ Find product by ID
  const product = products.find((p) => p._id === id);

  // ✅ Image URL Fix (MongoDB uses full URL already)
  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http") ? img : `http://localhost:5000/images/${img}`;
  };

  // ✅ Set thumbnail when product loads
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // ✅ Related products based on same category
  useEffect(() => {
    if (product && products.length > 0) {
      const related = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  return (
    product && (
      <div className="mt-16">
        {/* Breadcrumb */}
        <p>
          <Link to="/">Home</Link> /
          <Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>
          / <span className="text-indigo-500">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-6">
          {/* ✅ Images Section */}
          <div className="flex gap-3">
            {/* Thumbnail List */}
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className="border max-w-24 border-gray-300 rounded overflow-hidden cursor-pointer"
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Thumbnail */}
            <div className="border border-gray-300 rounded overflow-hidden max-w-md">
              <img
                src={getImageUrl(thumbnail)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ✅ Product Info */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            {/* Ratings */}
            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="w-4"
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            {/* ✅ Price Section */}
            <div className="mt-6">
              <p className="text-2xl font-medium">
                Price: ₹{product.price}
              </p>
              <span className="text-gray-500 text-sm">
                (inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 font-medium bg-gray-100 hover:bg-gray-200 transition rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
                className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Related Products */}
        <div className="flex flex-col items-center mt-20">
          <p className="text-2xl font-medium">Related Products</p>

          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="w-1/2 my-8 py-3.5 bg-indigo-500 text-white hover:bg-indigo-600 transition rounded"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default SingleProduct;
