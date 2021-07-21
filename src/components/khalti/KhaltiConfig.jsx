import { toast } from "react-toastify";
import axios from "axios";
import { db } from "../Firebase";

let config = {
  // replace this key with yours
  publicKey: process.env.REACT_APP_KHALTI_PUBLIC_KEY,
  productIdentity: "12345",
  productName: "Mobify",
  productUrl: "https://mobify2021.netlify.app/",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      toast.success(" Thank you for your purchase! ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        progress: undefined,
      });
      console.log(payload);

      db.collection("orders")
        .add({
          orderID: payload.idx,
          mobileNum: payload.mobile,
          deliveryStatus: "pending",
          orderAmount: payload.amount,
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
  paymentPreference: ["KHALTI","MOBILE_BANKING"],
};

export default config;
