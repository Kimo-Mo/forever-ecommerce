import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import { ShopContext } from "./Contexts/ShopContext";

const App = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  useEffect(() => {
    const savedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (savedIsLoggedIn) {
      setIsLoggedIn(savedIsLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/Login");
    localStorage.removeItem("cartItems");
    setCartItems({});
    localStorage.removeItem("username");
  }
  return (
    <div className="container">
      <ToastContainer />
      <NavBar
        setShowSearchBar={setShowSearchBar}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      <SearchBar
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Collection" element={<Collection search={search} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/Products/:productId"
          element={<Product isLoggedIn={isLoggedIn} />}
        />
        {isLoggedIn && <Route path="/Cart" element={<Cart />} />}
        {isLoggedIn && <Route path="/PlaceOrder" element={<PlaceOrder />} />}
        <Route
          path="/Login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
