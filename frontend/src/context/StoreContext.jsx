import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://fooddev-imud.onrender.com";
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // 1. Update Local State (Visual feedback - Immediate)
    setCartItems((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: 1 };
      } else {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      }
    });

    // 2. Update Database (Backend Sync - Background)
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId }, // Body
        { headers: { token } } // Headers
      );
    }
  };

  const removeFromCart = async (itemId) => {
    // 1. Update Local State
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
        return newCart;
      } else {
        delete newCart[itemId];
        return newCart;
      }
    });

    // 2. Update Database
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // FIX 1: Change 'product.id' to 'product._id' (Database format)
        let itemInfo = food_list.find((product) => product._id === item);

        // FIX 2: Check if itemInfo exists prevents crash while loading data
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.log("Error fetching food list");
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData); // Ensure your backend returns 'cartData'
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = useMemo(
    () => ({
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
    }),
    // FIX 3: Add 'food_list' here so components update when data loads
    [cartItems, token, food_list]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
