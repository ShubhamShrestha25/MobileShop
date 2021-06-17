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
                <h3>MoB-ShoP</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla, nesciunt dolor ipsum velit minus temporibus, maiores accusantium animi, voluptas ab unde. Amet cum nisi sapiente inventore eaque voluptate expedita.</p>
                <ul className="socials">
                    <li><span><FacebookIcon/></span></li>
                    <li><span><InstagramIcon/></span></li>
                    <li><span><TwitterIcon/></span></li>
                    <li><span><YouTubeIcon/></span></li>
                </ul>
            </div>
            <div className="footerBottom">
                <p>copyright &copy;2021 MoB-ShoP</p>
            </div>
        </div>
    )
}

export default Footer
