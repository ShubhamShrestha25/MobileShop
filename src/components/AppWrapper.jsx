import React, { useContext, useState } from "react";
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

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userPhoto: "",
    uid: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          userName: user.displayName,
          userPhoto: user.photoURL,
          uid: user.uid,
        });
      }
    });
  }, []);

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

  const handleKhaltiButton = ({ totalPrice }) => {
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
          const productsInfo = shoppingCart.map((eachProduct) => {
            return {
              productName: eachProduct.ProductName,
              productQuantity: eachProduct.qty,
            };
          });

          db.collection("orders")
            .add({
              orderID: payload.idx,
              totalQty: totalQty,
              deliveryStatus: "pending",
              orderAmount: payload.amount / 100,
              userIDs: userInfo.uid,
              mobilenumber: payload.mobile,
              products: productsInfo,
            })
            .catch((error) => {
              alert(error.message);
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
      <Navbar
        handleKhaltiButton={handleKhaltiButton}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Hero />
      <Products />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default AppWrapper;
