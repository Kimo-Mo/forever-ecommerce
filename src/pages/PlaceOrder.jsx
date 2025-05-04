import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";
import { useShopContext } from "../customs/useShopContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getCartAmount, setCartItems } = useShopContext();
  return (
    <div className="placeOrder pt-5 border-top">
      <div className="d-flex align-items-center justify-content-start gap-3 mb-5">
        <h3 className="m-0">
          <span className="text-secondary">DELIVERY</span> INFORMATION
        </h3>
        <p
          className="m-0"
          style={{
            width: "2rem",
            height: "2px",
            backgroundColor: "black",
          }}></p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (getCartAmount() === 0) {
            toast.error("Add Products to cart first!");
          } else {
            localStorage.removeItem("cartItems");
            setCartItems({});
            toast.success("This Order is Placed successfully.");
          }
          navigate("/collection");
        }}
        className="d-flex flex-column flex-md-row gap-5">
        <div style={{ flex: "1" }}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Second Name"
                required
              />
            </div>
            <div className="col-12">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="zipCode"
                className="form-control"
                placeholder="ZIP Code"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                required
              />
            </div>
            <div className="col-12">
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Phone"
                required
              />
            </div>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <CartTotal />
          <button
            type="submit"
            className="btn bg-dark text-light py-2 px-4 ms-auto mt-4 d-block text-uppercase"
            style={{ width: "fit-content" }}>
            Place order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
