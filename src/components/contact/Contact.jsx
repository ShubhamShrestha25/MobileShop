import React from 'react'
import "./Contact.css"
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';

const Contact = () => {
    return (
        <div className="contact" id="contact">
            <div className="content">
                <h2>Contact Us</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus hic illum cumque ad unde reprehenderit neque alias quas. Obcaecati, voluptas omnis magni fugit dolore pariatur aperiam quod nihil facere ratione?</p>
            </div>
            <div className="container">
                <div className="contactInfo">
                    <div className="box">
                        <div className="icon"><LocationOnIcon/></div>
                        <div className="text">
                            <h3>Address</h3>
                            <p>New road,<br/> Kathmandu,Nepal</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon"><PhoneIcon/></div>
                        <div className="text">
                            <h3>Phone</h3>
                            <p>01-444400, 9888801371</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon"><EmailIcon/></div>
                        <div className="text">
                            <h3>Email</h3>
                            <p>Mobilestore@gmail.com</p>
                        </div>
                    </div>
                </div>
            <div className="contactForm">
                <form>
                    <h2>Send Message</h2>
                    <div className="inputBox">
                        <input type="text" name="" required="required"/>
                        <span>Full Name</span>
                    </div>
                    <div className="inputBox">
                        <input type="email" name="" required="required"/>
                        <span>Email</span>
                    </div>
                    <div className="inputBox">
                        <textarea required="required"></textarea>
                        <span>Type your Message...</span>
                    </div>
                    <div className="inputBox">
                        <input type="submit" name="" value="send"/>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Contact

