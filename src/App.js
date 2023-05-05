import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/layout/Layout";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import DetailPage from "./components/pages/DetailPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ShopPage from "./components/pages/ShopPage";

function App() {
  const { isLogin } = useSelector((state) => state.logInReducer);
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={!isLogin && <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/detail/:productId" element={<DetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
