/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export const ShopContext = createContext({});
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("/")) {
      // ====== fetch from vercel deployment ======
      fetch(
        "https://forever-json-server.vercel.app/products"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
      // ====== fetch from local host ======
      // fetch("http://localhost:3000/products")
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setProducts(data);
      //   })
      //   .catch((err) => console.log(err));

      const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (savedCartItems) {
        setCartItems(savedCartItems);
      }
    }
  }, [pathname]);
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
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
