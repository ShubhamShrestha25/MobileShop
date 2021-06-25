import axios from "axios";
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
            alert(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount
            };
            
            let config = {
                headers: {'Authorization': myKey.secretKey}
            };
            
            axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
                .then(response => {
                   alert("Thank you !")
                })
                .catch(error => {
                    console.log(error);
                });
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