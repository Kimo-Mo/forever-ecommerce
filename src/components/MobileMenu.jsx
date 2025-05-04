import { useAuth } from "../customs/useAuth";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MobileMenu = ({ menuIsVisible, setMenuIsVisible }) => {
  const { isAdmin } = useAuth();
  return (
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
        {isAdmin && (
          <NavLink
            to="/Admin"
            className="py-3 ps-5 border"
            onClick={() => {
              setMenuIsVisible(false);
            }}>
            Admin
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
