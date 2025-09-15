import "./Style/NavBar.css";
import { Link } from "react-router-dom";
import { useShopContext } from "../customs/useShopContext";
import { useAuth } from "../customs/useAuth";
import NavMenu from "./NavMenu";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
const NavBar = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const { getCartCount, setShowSearchBar } = useShopContext();
  const { isLoggedIn, logout, currentUser } = useAuth();

  return (
    <div className="navBar d-flex justify-content-between align-items-center py-4 fw-medium">
      <Link to="/">
        <img src="/imgs/logo.png" alt="Logo Image" style={{ width: "9rem" }} />
      </Link>
      <NavMenu />

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
                  <p>{currentUser?.displayName || "User"}</p>
                  <p onClick={() => logout()}>Logout</p>
                </div>
              </div>
            </>
          ) : (
            <Link to={"/Authentication"}>
              <img
                src="/imgs/profile_icon.png"
                alt="profile icon"
                className="navIcon"
              />
            </Link>
          )}
        </div>
        <Link to="/Cart" className="position-relative">
          <img src="/imgs/cart_icon.png" alt="cart icon" className="navIcon" />
          <span className="cartNumber">{getCartCount()}</span>
        </Link>
        <img
          onClick={() => setMenuIsVisible(true)}
          src="/imgs/menu_icon.png"
          alt="menu icon"
          className="navIcon d-block d-md-none"
        />
      </div>
      <MobileMenu
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
    </div>
  );
};

export default NavBar;
