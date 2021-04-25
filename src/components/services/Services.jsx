import React from 'react'
import "./Services.css"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const Services = () => {
    return (
        <div className="services">
        <div className="wrapper">
            <h2>Our Services</h2>
            <div className="line"></div>
            <div className="single-service">
                <div className="social"><i><LocalShippingIcon/></i></div>
                <span></span>
                <h3>Fast Delivery</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dolore optio. Laboriosam veritatis tempora alias id voluptates, expedita amet dignissimos voluptatum sequi assumenda dolor vero quibusdam recusandae tenetur obcaecati blanditiis?</p>
             </div>   
             <div className="single-service">
                <div className="social"><i><PaymentIcon/></i></div>
                <span></span>
                <h3>Secured Payment</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dolore optio. Laboriosam veritatis tempora alias id voluptates, expedita amet dignissimos voluptatum sequi assumenda dolor vero quibusdam recusandae tenetur obcaecati blanditiis?</p>
                </div>
                <div className="single-service">
                <div className="social"><i><ContactPhoneIcon/></i></div>
                <span></span>
                <h3>24/7 Customer Service</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dolore optio. Laboriosam veritatis tempora alias id voluptates, expedita amet dignissimos voluptatum sequi assumenda dolor vero quibusdam recusandae tenetur obcaecati blanditiis?</p>
            </div>
            </div>
        </div>
    )
}

export default Services
