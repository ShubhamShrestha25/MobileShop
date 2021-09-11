import React, { useContext } from "react";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";
import Hero from "./Hero/Hero";
import Navbar from "./navbar/Navbar";
import Products from "./product/Products";
import Services from "./services/Services";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import { db } from "./Firebase";
import firebase from "firebase/app";
import { CartContext } from "./global/CartContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AppWrapper = () => {
  const { dispatch, shoppingCart, totalPrice, totalQty } =
    useContext(CartContext);
  useEffect(() => {
    if (Array.isArray(shoppingCart)) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  }, [shoppingCart]);
  useEffect(() => {
    localStorage.setItem("totalPrice", totalPrice || 0);
  }, [totalPrice]);

  useEffect(() => {
    localStorage.setItem("totalQty", totalQty || 0);
  }, [totalQty]);

  const handleNextButton = ({ totalPrice }) => {
    let config = {
      // replace this key with yours
      publicKey: process.env.REACT_APP_KHALTI_PUBLIC_KEY,
      productIdentity: "12345",
      productName: "Mobify",
      productUrl: "https://mobify2021.netlify.app/",
      eventHandler: {
        onSuccess(payload) {
          // hit merchant api for initiating verfication
          console.log(payload);
          toast.success("Payment Sucessfull");
          dispatch({ type: "EMPTY" });
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const uid = user.uid;
              const productNames = shoppingCart.map((eachProduct) => {
                return eachProduct.ProductName;
              });
              const productquantity = shoppingCart.map((eachProduct) => {
                return eachProduct.qty;
              });

              db.collection("orders")
                .add({
                  orderID: payload.idx,
                  totalQty: totalQty,
                  deliveryStatus: "pending",
                  orderAmount: payload.amount / 100,
                  userIDs: uid,
                  mobilenumber: payload.mobile,
                  productNames: productNames,
                  productquantity: productquantity,
                })
                .catch((error) => {
                  alert(error.message);
                });
            }
          });

          const { token, amount } = payload;

          axios
            .get(
              `http://localhost:5000/transaction?token=${token}&amount=${amount}`
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        // onError handler is optional
        onError(error) {
          // handle errors
        },
      },
      paymentPreference: ["KHALTI"],
    };
    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 });
  };

  return (
    <>
      <Navbar handleNextButton={handleNextButton} />
      <Hero />
      <Products />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default AppWrapper;
