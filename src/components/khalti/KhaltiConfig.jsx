import myKey from "./KhaltiKey"

let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "12345",
    "productName": "Mobify",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
           alert("Payment Successful")
            
        
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            alert(error);
        },
    },
    "paymentPreference": ["KHALTI", "EBANKING"],
};

export default config;