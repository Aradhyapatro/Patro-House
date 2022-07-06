import Main from "./Screens/MainScreen";
import CartScreen from "./Screens/CartScreen";
import Product from "./Screens/ProductScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScareen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import { useEffect } from "react";

function App() {

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/payment" element={<PaymentScreen />}></Route>
          <Route path="/Shipping" element={<ShippingScreen />}></Route>
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
          <Route path="/Register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/login?" element={<LoginScreen />}></Route>
          <Route path="/products/:id" element={<Product />}></Route>
          <Route path="/cart/:id" element={<CartScreen />}></Route>
          <Route path="/cart/" element={<CartScreen />}></Route>
          <Route path="/profile" element={<ProfileScreen />}></Route>
        </Routes>
      </BrowserRouter>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
