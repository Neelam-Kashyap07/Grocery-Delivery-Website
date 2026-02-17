import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------------------
  // FETCH PRODUCTS (SAFE)
  // ---------------------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Product fetch failed");
    }
  };

  // ---------------------------
  // OPTIONAL AUTH FUNCTIONS
  // (disabled on load)
  // ---------------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart || {});
      }
    } catch (error) {
      // silently ignore (401 expected if not logged in)
      console.warn("User not authenticated");
    }
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // ---------------------------
  // CART FUNCTIONS (LOCAL FIRST)
  // ---------------------------
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems || {});
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
      setCartItems(cartData);
    }
  };

  const cartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const totalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += cartItems[id] * product.offerPrice;
      }
    }
    return Math.floor(total * 100) / 100;
  };

  // ---------------------------
  // INITIAL LOAD (SAFE)
  // ---------------------------
  useEffect(() => {
    fetchProducts();
    // ❌ fetchUser();    // disabled for demo
    // ❌ fetchSeller();  // disabled for demo
  }, []);

  // ---------------------------
  // UPDATE CART TO DB (ONLY IF LOGGED IN)
  // ---------------------------
  useEffect(() => {
    const updateCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch {
        console.warn("Cart sync skipped (not logged in)");
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

  // ---------------------------
  // CONTEXT VALUE
  // ---------------------------
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
