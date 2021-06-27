import React from 'react'
import "./Footer.css"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContent">
                <h3>MoBify</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla, nesciunt dolor ipsum velit minus temporibus, maiores accusantium animi, voluptas ab unde. Amet cum nisi sapiente inventore eaque voluptate expedita.</p>
                <ul className="socials">
                   <a href="https://www.facebook.com//" alt=""> <li><span><FacebookIcon/></span></li> </a>
                   <a href="https://www.instagram.com/" alt="">  <li><span><InstagramIcon/></span></li> </a>
                   <a href="https://twitter.com/" alt="">  <li><span><TwitterIcon/></span></li> </a>
                   <a href="https://www.youtube.com/" alt=""> <li><span><YouTubeIcon/></span></li> </a>
                </ul>
            </div>
            <div className="footerBottom">
                <p>copyright &copy;2021 MoBify</p>
            </div>
        </div>
    )
}

export default Footer
