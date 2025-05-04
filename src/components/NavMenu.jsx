import { NavLink } from "react-router-dom";
import { useAuth } from "../customs/useAuth";

const NavMenu = () => {
  const { isAdmin } = useAuth();
  return (
    <>
      <ul className="d-none d-md-flex text-dark gap-3 m-0">
        <li>
          <NavLink
            to="/"
            className="d-flex flex-column align-items-center gap-1">
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
        </li>
        <li>
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
        </li>
        <li>
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
        </li>
        <li>
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
        </li>
        {isAdmin && (
          <li>
            <NavLink
              to="/Admin"
              className="d-flex flex-column align-items-center gap-1">
              <p className="m-0">Admin</p>
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
          </li>
        )}
      </ul>
    </>
  );
};

export default NavMenu;
