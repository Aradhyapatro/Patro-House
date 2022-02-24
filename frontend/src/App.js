import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Main from "./Screens/Main";
import Product from "./Screens/Product";
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
          <Route path="products/:id" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;