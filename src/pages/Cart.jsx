import { useEffect, useState } from "react";
import LoadingProducts from "../components/LoadingProducts";
import { toast } from "react-toastify";
import { useShopContext } from "../customs/useShopContext";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, updateQuantity, getCartAmount } =
    useShopContext();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (products) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);
  return products ? (
    <div className="pt-5 border-top">
      <div className="d-flex align-items-center justify-content-start gap-3 mb-5">
        <h3 className="m-0">
          <span className="text-secondary">YOUR</span> CART
        </h3>
        <p
          className="m-0"
          style={{
            width: "2rem",
            height: "2px",
            backgroundColor: "black",
          }}></p>
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product.id === item.id
          );
          return (
            productData && (
              <div
                key={index}
                className="py-4 border-top border-bottom d-flex align-items-center justify-content-center justify-content-md-between gap-3 gap-md-0">
                <div className="productCartItem d-flex align-items-start justify-content-center gap-3">
                  <img
                    src={productData.img}
                    alt="product image"
                    style={{ width: "5rem" }}
                  />
                  <div>
                    <h6>{productData.title}</h6>
                    <p className="mb-0 mt-3">
                      <span>${productData.price}</span>
                      <span className="bg-light-subtle border py-1 px-2 ms-3 text-uppercase">
                        {item.size}
                      </span>
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  min="1"
                  defaultValue={item.quantity}
                  className="form-control"
                  style={{ maxWidth: "5rem" }}
                  onChange={(e) => {
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item.id,
                          item.size,
                          Number(e.target.value)
                        );
                  }}
                />
                <img
                  src="/imgs/bin_icon.png"
                  alt=""
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    cursor: "pointer",
                  }}
                  className=""
                  onClick={() => {
                    updateQuantity(item.id, item.size, 0);
                    toast.error("You Deleted Product(s)!");
                  }}
                />
              </div>
            )
          );
        })}
      </div>
      <div className="d-flex justify-content-end flex-column gap-3">
        <CartTotal />
        <button
          onClick={() => {
            if (getCartAmount() === 0) {
              toast.error("Add Products to cart first!");
              navigate("/collection");
            } else {
              navigate("/PlaceOrder");
            }
          }}
          className="btn bg-dark text-light py-2 px-4 ms-auto mt-4 text-uppercase"
          style={{ width: "fit-content" }}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default Cart;
