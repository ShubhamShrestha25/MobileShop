import React, { useRef, useState } from 'react'
import { MenuItems } from './MenuItems'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { animateScroll as scroll, Link } from 'react-scroll';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {auth, provider } from '../Firebase'



const safeDocument = typeof document !== 'undefined' ? document : {};

const Navbar = () => {
    const html = safeDocument.documentElement;
    const divRef = useRef(null);

    const [navbar, setNavbar] = useState(false)
    const changeBackground = () => {
        if (window.scrollY > 100) {
            setNavbar(true);
            divRef.current.className = "navbaractive";
        }
        else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground)

    const [clicked, setclicked] = useState(false)
    const clickHandler = () => {
        setclicked(!clicked);
        const class_name = divRef.current;
        if (clicked) {
            class_name.className = "navbar";
            html.style.overflowY = 'scroll';
        } else {
            class_name.classList.add("add-background");
            html.style.overflowY = 'hidden';
        }
    }

    const [open, setOpen] = useState(false)
    const openSlider = () => {
        setOpen(!open)
    }

    const multipleFunction = () => {
        setclicked(!clicked);
        html.style.overflowY = 'scroll';
    }


    const loginHandler = () => {
        auth.signInWithPopup(provider) 

    }


    return (
        <div className={navbar ? 'navbaractive' : 'navbar'} ref={divRef}>
            <h1 className="navbar-logo" onClick={() => scroll.scrollToTop()}>
                MoB-ShoP
            </h1>
            <div className="menu-icon" onClick={clickHandler}>
                {clicked ? <CloseIcon /> : <MenuIcon />}
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index} >
                            <Link onClick={() => multipleFunction()} className={item.cName} to={item.url} smooth={true} duration={1000} >{item.title}</Link>
                        </li>
                    )
                })}
            </ul>

            <div className="right">
                <div className="basket" >
                    <ShoppingCartIcon onClick={openSlider} />
                    <span>0</span>
                </div>
                <div className={open ? 'sidemenu active' : 'sidemenu'}>
                    <h1>Shopping Cart</h1>
                    <button className="closebtn" onClick={openSlider}><CloseRoundedIcon /></button>
                </div>
                <div>
                <button className="login" onClick={() => loginHandler(provider)}>LogIn</button>
                </div>
            </div>
        </div>
    )

}

export default Navbar
