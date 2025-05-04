/* eslint-disable react/prop-types */
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const ShopContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState();
  useEffect(() => {
    fetchProducts();
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);
  async function fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }
  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Please Select a Size for Product !");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    toast.success("This Product is Added to Cart");
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };
  const getCartAmount = () => {
    if (products) {
      let totalAmount = 0;
      for (const items in cartItems) {
        let itemInfo = products.find((product) => product.id === items);
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      return totalAmount;
    }
  };
  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
  };

  const value = {
    products,
    fetchProducts,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    showSearchBar,
    setShowSearchBar,
    search,
    setSearch,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
