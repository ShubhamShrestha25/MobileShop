import myKey from "./KhaltiKey";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "12345",
  productName: "Mobify",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      toast.success("Payment Successfull !! ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        progress: undefined,
      });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
    },
  },
  paymentPreference: ["KHALTI"],
};

export default config;
