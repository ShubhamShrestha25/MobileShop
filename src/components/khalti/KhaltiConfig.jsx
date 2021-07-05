import myKey from "./KhaltiKey";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "12345",
  productName: "Mobify",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
  },
  paymentPreference: ["KHALTI"],
};

export default config;
