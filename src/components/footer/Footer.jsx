import React from "react";
import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <h3>MoBify</h3>
        <p>
          Mobify is a website for purchasing your favourite smartphone and
          mobile devices through our secured payment services and fast delivery
          to satisfy our customers for better experience at purchasing your
          smartphone through our website
        </p>
        <ul className="socials">
          <a
            href="https://www.facebook.com//"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <span>
                <FacebookIcon />
              </span>
            </li>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <span>
                <InstagramIcon />
              </span>
            </li>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <span>
                <TwitterIcon />
              </span>
            </li>
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <span>
                <YouTubeIcon />
              </span>
            </li>
          </a>
        </ul>
      </div>
      <div className="footerBottom">
        <p>copyright &copy;2021 MoBify</p>
      </div>
    </div>
  );
};

export default Footer;
