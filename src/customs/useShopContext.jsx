import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within an AuthProvider");
  }
  return context;
};
