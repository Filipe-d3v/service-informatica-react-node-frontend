import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [productsToCart, setproductsToCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addProductToCart = (_id, name, dpt, price, image, description) => {
    const copyProducts = [...productsToCart]

    const item = copyProducts.find((product) => product._id === _id);

    if (!item) {
      copyProducts.push({ _id: _id, name: name, dpt: dpt, price: price, image: image, description: description, qty: 1 });
    } else {
      item.qty = item.qty + 1;
    }

    setproductsToCart(copyProducts);
  };

  const removeToCart = (itemId) => {
    const existsItem = productsToCart.find((i) => i._id === itemId);

    if (existsItem.qty === 1) {
      setproductsToCart(productsToCart.filter((i) => i._id !== itemId));
    } else {
      setproductsToCart(
        productsToCart.map((i) =>
          i._id === itemId ? { ...i, qty: i.qty - 1 } : i
        )
      );
    }
  };

  const clearCart = () => {
    setproductsToCart([]);
  };

  const calcTotal = () => {
    const total = productsToCart.reduce((i, product) => {

      return i + product.price * product.qty;
    }, 0);
    return total;
  }

  useEffect(() => {
    setTotal(productsToCart.reduce((i, product) => {
      return i + product.price * product.qty;
    }, 0));
}, [productsToCart])

return (
  <CartContext.Provider value={{ productsToCart, addProductToCart, removeToCart, clearCart, total }}>
    {children}
  </CartContext.Provider>
);
};

export default CartContextProvider;