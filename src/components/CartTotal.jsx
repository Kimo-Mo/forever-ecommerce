import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";

const CartTotal = () => {
  const { getCartAmount } = useContext(ShopContext);
  return (
    <div className="cartTotal mt-5">
      <div className="d-flex align-items-center justify-content-start gap-3 mb-4">
        <h4 className="m-0">
          <span className="text-secondary">CART</span> TOTALS
        </h4>
        <p
          className="m-0"
          style={{
            width: "2rem",
            height: "2px",
            backgroundColor: "black",
          }}></p>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between">
          <p className="m-0">Subtotal</p>
          <p className="m-0">${getCartAmount()}.00</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0">Shipping Fee</p>
          <p className="m-0">$10.00</p>
        </div>
        <div className="d-flex justify-content-between">
          <b className="m-0">Total</b>
          <b className="m-0">
            ${getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
