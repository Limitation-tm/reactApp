import "./scss/App.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import React from "react";
import { Registration } from "./pages/Registration";
import NewLogin from "./pages/Login/newLogin";
import FullBurger from "./pages/FullBurger";
import { fetchUserMyData } from "./redux/slices/authSlice";
import { Me } from "./pages/Me";
import ProductsPanel from "./pages/ProductsPanel";
import OrderOne from "./pages/OrderOne";
import NewProduct from "./pages/NewProduct";
import { useAppDispatch } from "./redux/store";
import Footer from "./components/Footer";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUserMyData());
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:_id" element={<FullBurger />} />
            <Route path="/product/:_id/edit" element={<NewProduct />} />
            <Route path="/product/create" element={<NewProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<NewLogin />} />
            <Route path="/me" element={<Me />} />
            <Route
              path="/admin/productspanel/:_id"
              element={<ProductsPanel />}
            />
            <Route path="/myorders" element={<OrderOne />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
