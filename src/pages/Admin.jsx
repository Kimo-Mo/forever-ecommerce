import "../components/Style/AdminPage.css";
import { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import OrdersList from "../components/OrdersList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../customs/useAuth";

const Admin = () => {
  const { currentUser, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("add");
  useEffect(() => {
    if (!isLoading && !currentUser && !isAdmin) {
      navigate('/Authentication');
    }
  }, [currentUser, isLoading, navigate, isAdmin]);
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
          {currentState == "orders" && <OrdersList />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
