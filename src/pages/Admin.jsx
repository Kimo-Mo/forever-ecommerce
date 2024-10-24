import "../components/Style/AdminPage.css";
import { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

const Admin = () => {
  const [currentState, setCurrentState] = useState("add");
  return (
    <div className="adminPage border-top border-md-bottom d-flex flex-column flex-md-row">
      <AdminSideBar
        currentState={currentState}
        setCurrentState={setCurrentState}
      />
      <div style={{ flex: "8" }}>
        <div className="pt-4 ps-md-5">
          {currentState == "add" && <AddProduct />}
          {currentState == "list" && <ProductList />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
