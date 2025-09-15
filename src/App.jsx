import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingProducts from "./components/LoadingProducts";
import { useAuth } from "./customs/useAuth";

// lazy loading components
const Collection = React.lazy(() => import("./pages/Collection"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const PlaceOrder = React.lazy(() => import("./pages/PlaceOrder"));
const Login = React.lazy(() => import("./pages/Authentication"));
const Admin = React.lazy(() => import("./pages/Admin"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Collection"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <Collection />
            </React.Suspense>
          }
        />
        <Route
          path="/About"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <About />
            </React.Suspense>
          }
        />
        <Route
          path="/Contact"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <Contact />
            </React.Suspense>
          }
        />
        <Route
          path="/Products/:productId"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <Product />
            </React.Suspense>
          }
        />
        <Route
          path="/Cart"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <Cart />
            </React.Suspense>
          }
        />
        {isLoggedIn && (
          <Route
            path="/PlaceOrder"
            element={
              <React.Suspense fallback={<LoadingProducts />}>
                <PlaceOrder />
              </React.Suspense>
            }
          />
        )}
        {!isLoggedIn && (
          <Route
            path="/Authentication"
            element={
              <React.Suspense fallback={<LoadingProducts />}>
                <Login />
              </React.Suspense>
            }
          />
        )}
        {isAdmin && isLoggedIn && (
          <Route
            path="/Admin"
            element={
              <React.Suspense fallback={<LoadingProducts />}>
                <Admin />
              </React.Suspense>
            }
          />
        )}
        <Route
          path="*"
          element={
            <React.Suspense fallback={<LoadingProducts />}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
