import Main from "./Screens/Main";
import CartScreen from "./Screens/CartScreen";
import Product from "./Screens/Product";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/products/:id" element={<Product />}></Route>
          <Route path="/cart/:id" element={<CartScreen />}></Route>
          <Route path="/cart/" element={<CartScreen />}></Route>
        </Routes>
      </BrowserRouter>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
