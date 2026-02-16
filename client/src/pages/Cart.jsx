import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Load cart products
  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  // Fetch address
  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0) {
      getCart();
    }
  }, [products, cartItems]);

  // Place Order
  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please add/select an address");
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return cartArray.length > 0 ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      
      {/* Cart Products */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {cartCount()} Items
          </span>
        </h1>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-600 text-sm md:text-base py-4 border-b"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(`/product/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 border border-gray-300 rounded overflow-hidden"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {product.name}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Qty:
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    className="ml-2 border rounded px-1 outline-none"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            {/* Subtotal */}
            <p className="text-center font-medium text-gray-800">
              ₹{product.price * product.quantity}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(product._id)}
              className="text-red-500 font-bold text-center"
            >
              ✖
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="mt-8 text-indigo-500 font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* Order Summary (WHITE CARD) */}
      <div className="max-w-[360px] w-full">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="mb-4">
            <p className="font-medium">Delivery Address</p>
            <p className="text-sm text-gray-600 mt-1">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}`
                : "No Address Found"}
            </p>
          </div>

          <div className="mb-4">
            <p className="font-medium">Payment Method</p>
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border px-3 py-2 mt-2 rounded"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{totalCartAmount()}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full py-3 mt-6 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h2 className="text-center mt-20 text-xl font-medium">
      Cart is Empty
    </h2>
  );
};

export default Cart;
