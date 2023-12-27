import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import CartPage from "./pages/Cart/CartPage";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/Login/LoginPage";
import ProductPage from "./pages/Product/ProductPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { Toaster } from 'react-hot-toast';
import LogContext from "./Utilities/LogContext";
import OrderSuccess from "./components/OrderSuccess";
import Checkout from "./components/Checkout";

function App() {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  return (
    <>
      <LogContext.Provider value={[isUserLoggedin, setIsUserLoggedin]}>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Toaster position="top-center" toastOptions={{ style: { width: "300px ", fontSize: "30px" } }} />
      </LogContext.Provider>
    </>
  );
}

export default App;
