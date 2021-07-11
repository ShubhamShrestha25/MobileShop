import React, { useState } from "react";
import "./Contact.css";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { db } from "../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        toast.success("Message has been submitted");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact" id="contact">
      <div className="content">
        <h2>Contact Us 📞</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus hic
          illum cumque ad unde reprehenderit neque alias quas. Obcaecati,
          voluptas omnis magni fugit dolore pariatur aperiam quod nihil facere
          ratione?
        </p>
      </div>
      <div className="container">
        <div className="contactInfo">
          <div className="box">
            <div className="icon">
              <LocationOnIcon />
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>
                New road,
                <br /> Kathmandu,Nepal
              </p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <PhoneIcon />
            </div>
            <div className="text">
              <h3>Phone</h3>
              <p>01-444400, 9888801371</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <EmailIcon />
            </div>
            <div className="text">
              <h3>Email</h3>
              <p>Mobilestore@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contactForm">
          <form onSubmit={handleSubmit}>
            <h2>Send Message</h2>
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Full Name</span>
            </div>
            <div className="inputBox">
              <input
                type="email"
                name=""
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <textarea
                required="required"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span>Type your Message...</span>
            </div>
            <div className="inputBox">
              <input
                type="submit"
                name=""
                value="send"
                style={{ background: loading ? "#ccc" : "rgb(34, 38, 241)" }}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
      />
    </div>
  );
};

export default Contact;
