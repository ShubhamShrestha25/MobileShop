import React from "react";
import "./Services.css";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const Services = () => {
  return (
    <div className="services">
      <div className="wrapper" id="service">
        <h2>Our Services</h2>
        <div className="line"></div>
        <div className="single-service">
          <div className="social">
            <i>
              <LocalShippingIcon />
            </i>
          </div>
          <span></span>
          <h3>Fast Delivery</h3>
          <p>
            We provide fast delivery of our products within 1-2 working day with
            return policy and full cashback if product is found to be damage or
            faulty
          </p>
        </div>
        <div className="single-service">
          <div className="social">
            <i>
              <PaymentIcon />
            </i>
          </div>
          <span></span>
          <h3>Secured Payment</h3>
          <p>
            We provide a secured payment gateway to purchase your favourite
            mobile devices and smartphones through our website using Khalti
            payment for fast and secured transactions
          </p>
        </div>
        <div className="single-service">
          <div className="social">
            <i>
              <ContactPhoneIcon />
            </i>
          </div>
          <span></span>
          <h3>24/7 Customer Service</h3>
          <p>
            We provide 24/7 customer service to our lovely customers so feel
            free to contact us any time and we will be back with you as soon as
            possible
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
