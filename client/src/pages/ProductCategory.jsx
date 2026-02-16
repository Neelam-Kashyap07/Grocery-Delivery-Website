import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  // Find category object from categories array
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  // Filter products based on matched category path
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === searchCategory?.path.toLowerCase()
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-3xl md:text-4xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <h1 className="text-3xl md:text-4xl font-medium">
          No products found
        </h1>
      )}
    </div>
  );
};

export default ProductCategory;
