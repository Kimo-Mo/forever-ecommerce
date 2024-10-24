/* eslint-disable react/prop-types */

const AdminSideBar = ({ currentState, setCurrentState }) => {
  return (
    <div className="sideBar border-end pt-4" style={{ flex: "2", height: "100vh" }}>
      <a
        href="#"
        className={`d-block py-2 px-3 mb-3 ${
          currentState == "add" ? "active" : ""
        }`}
        onClick={() => {
          setCurrentState("add");
        }}>
        Add Product
      </a>
      <a
        href="#"
        className={`d-block py-2 px-3 mb-4 ${
          currentState == "list" ? "active" : ""
        }`}
        onClick={() => {
          setCurrentState("list");
        }}>
        Products List
      </a>
    </div>
  );
};

export default AdminSideBar