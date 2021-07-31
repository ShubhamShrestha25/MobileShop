import React, { createContext, useReducer } from "react";
import CartReducer from "../global/CartReducer";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(CartReducer, {
    shoppingCart: localStorage.getItem("shoppingCart")
      ? JSON.parse(localStorage.getItem("shoppingCart"))
      : [],
    totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
    totalQty: localStorage.getItem("totalQty")
    ? JSON.parse(localStorage.getItem("totalQty"))
    : 0,
  });

  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
