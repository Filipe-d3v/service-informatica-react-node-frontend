import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from "./components/layouts/Footer";
import Main from "./components/layouts/Main";
import Nav from "./components/layouts/Nav";
import Home from "./components/pages/home/Home";
import Products from "./components/pages/products/Products";
import Login from "./components/pages/login/Login"
import { UserProvider } from "./context/UserContext";
import Message from './components/layouts/Message';
import { SnackbarProvider } from 'notistack';
import CartContextProvider from "./context/CartContext";
import Cart from "./components/layouts/Cart";

function App() {
  return (
    <SnackbarProvider>
      <CartContextProvider>
        <Router>
          <UserProvider>
            <Nav />
            <Message />
            <Main>
              <Routes>
              <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                
                <Route path="/users" element={<Nav />} />
              </Routes>
            </Main>
            <Footer />
          </UserProvider>
        </Router>
      </CartContextProvider>
    </SnackbarProvider>
  );
}

export default App;
