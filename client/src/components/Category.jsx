import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const pastelColors = [
  "bg-green-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-teal-100",
];

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className={`group cursor-pointer py-6 px-4 rounded-xl 
              ${pastelColors[index % pastelColors.length]}
              flex flex-col items-center justify-center 
              transition-transform hover:scale-105`}
          >
            <img
              src={category.image}
              alt={category.text}
              className="max-w-28 transition-transform group-hover:scale-110"
            />
            <p className="text-sm font-medium mt-3 text-center text-gray-800">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
