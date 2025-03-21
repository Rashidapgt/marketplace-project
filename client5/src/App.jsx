import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import Login from "./components/Login";
import OrderHistory from "./components/OrderHistoryPage.jsx";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductLists.jsx";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard.jsx";



const App = () => {
  return (
    <Router>
      <Navbar /> 
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order/:orderId" element={<OrderHistory />} />
          <Route path="/dashboard" element={<ProtectedRoute />}/>
          <Route path="" element={<Dashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
};

export default App;
