import React, { useState } from 'react'
import { MenuItems } from './MenuItems'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { animateScroll as scroll, Link } from 'react-scroll';


const Navbar = () => {
    const [clicked, setclicked] = useState(false)
    const clickHandler = () =>{
        setclicked (!clicked);
    }
    return (
        <div className="navbarItems">
            <h1 className="navbar-logo" onClick={() => scroll.scrollToTop()}>
                MobileS
            </h1>
            <div className="menu-icon" onClick={clickHandler}>
               {clicked ?  <CloseIcon />  :  <MenuIcon/>}
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return(
                        <li key={index} >
                        <Link onClick={() => setclicked(!clicked)} className={item.cName} to={item.url} smooth={true} duration={1000} >{item.title}</Link>
                        </li>
                    )                                    
                })}
            </ul>
            <div className="rightIcons">
            <ShoppingCartIcon />
            <AccountCircleIcon />
            </div>   
        </div>
    )
    
}

export default Navbar
  