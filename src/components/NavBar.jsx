/* eslint-disable react/prop-types */
import "./Style/NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
const NavBar = ({
  setShowSearchBar,
  handleLogout,
  isLoggedIn,
}) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  return (
    <div className="navBar d-flex justify-content-between align-items-center py-4 fw-medium">
      <Link to="/">
        <img src="/imgs/logo.png" alt="Logo Image" style={{ width: "9rem" }} />
      </Link>
      <ul className="d-none d-md-flex text-dark gap-3 m-0">
        <NavLink to="/" className="d-flex flex-column align-items-center gap-1">
          <p className="m-0">Home</p>
          <hr
            className="m-0 d-none"
            style={{
              width: "50%",
              height: "1.5px",
              border: "none",
              backgroundColor: "black",
              opacity: "0.7",
            }}
          />
        </NavLink>
        <NavLink
          to="/Collection"
          className="d-flex flex-column align-items-center gap-1">
          <p className="m-0">Collection</p>
          <hr
            className="m-0 d-none"
            style={{
              width: "50%",
              height: "1.5px",
              border: "none",
              backgroundColor: "black",
              opacity: "0.7",
            }}
          />
        </NavLink>
        <NavLink
          to="/About"
          className="d-flex flex-column align-items-center gap-1">
          <p className="m-0">About</p>
          <hr
            className="m-0 d-none"
            style={{
              width: "50%",
              height: "1.5px",
              border: "none",
              backgroundColor: "black",
              opacity: "0.7",
            }}
          />
        </NavLink>
        <NavLink
          to="/Contact"
          className="d-flex flex-column align-items-center gap-1">
          <p className="m-0">Contact</p>
          <hr
            className="m-0  d-none"
            style={{
              width: "50%",
              height: "1.5px",
              border: "none",
              backgroundColor: "black",
              opacity: "0.7",
            }}
          />
        </NavLink>
      </ul>

      <div className="d-flex align-items-center gap-3">
        <Link
          to={"/Collection"}
          onClick={() => setShowSearchBar((prev) => !prev)}>
          <img
            src="/imgs/search_icon.png"
            alt="search icon"
            className="navIcon"
          />
        </Link>

        <div className="group position-relative">
          {isLoggedIn ? (
            <>
              <img
                src="/imgs/profile_icon.png"
                alt="profile icon"
                className="navIcon"
              />
              <div className="group-hover position-absolute pt-3">
                <div className="d-flex flex-column gap-3 py-3 px-4 rounded">
                  <p>
                    {JSON.parse(localStorage.getItem("username")) || "User"}
                  </p>
                  <p
                    onClick={() => {
                      handleLogout();
                    }}>
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Link to={"/Login"}>
              <img
                src="/imgs/profile_icon.png"
                alt="profile icon"
                className="navIcon"
              />
            </Link>
          )}
        </div>
        {isLoggedIn ? (
          <Link to="/Cart" className="position-relative">
            <img
              src="/imgs/cart_icon.png"
              alt="cart icon"
              className="navIcon"
            />
            {getCartCount() && isLoggedIn ? (
              <span className="cartNumber">{getCartCount()}</span>
            ) : (
              <></>
            )}
          </Link>
        ) : (
          <></>
        )}
        <img
          onClick={() => setMenuIsVisible(true)}
          src="/imgs/menu_icon.png"
          alt="menu icon"
          className="navIcon d-block d-md-none"
        />
      </div>
      <div
        className="mobileMenu position-fixed top-0 end-0 bottom-0 overflow-hidden bg-light text-dark"
        style={{ width: menuIsVisible ? "100%" : "0%" }}>
        <div className="d-flex flex-column text-dark">
          <div
            onClick={() => {
              setMenuIsVisible(false);
            }}
            className="d-flex align-items-center gap-3 p-3"
            style={{ cursor: "pointer" }}>
            <img
              src="/imgs/dropdown_icon.png"
              alt="back icon"
              style={{
                height: "1rem",
                transform: "rotate(180deg)",
              }}
            />
            <p className="m-0">Back</p>
          </div>
          <NavLink
            to="/"
            className="py-3 ps-5 border"
            onClick={() => {
              setMenuIsVisible(false);
            }}>
            Home
          </NavLink>
          <NavLink
            to="/Collection"
            className="py-3 ps-5 border"
            onClick={() => {
              setMenuIsVisible(false);
            }}>
            Collection
          </NavLink>
          <NavLink
            to="/About"
            className="py-3 ps-5 border"
            onClick={() => {
              setMenuIsVisible(false);
            }}>
            About
          </NavLink>
          <NavLink
            to="/Contact"
            className="py-3 ps-5 border"
            onClick={() => {
              setMenuIsVisible(false);
            }}>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
