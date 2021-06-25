import React, { useRef, useState, useContext  } from 'react'
import { MenuItems } from './MenuItems'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { animateScroll as scroll, Link } from 'react-scroll';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {auth, provider } from '../Firebase';
import { CartContext } from '../global/CartContext';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../khalti/KhaltiConfig';
import KhaltiCheckout from "khalti-checkout-web";


const safeDocument = typeof document !== 'undefined' ? document : {};

const Navbar = () => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
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

    const logoutHandler =  async () => {
       await auth.signOut().then(() => {
            console.log('user signed out')
        })
    }

    const [isLoggedIn] = useState(false)
    

    const logoutLink = (
        <button className="logout" onClick={() => logoutHandler()}>Logout</button>
    )

    const loginLink = (
        <button className="login" onClick={() => loginHandler(provider)}>LogIn</button>
    )

    // checkout with khalti \\
    let checkout = new KhaltiCheckout(config);



    return (
        <div className={navbar ? 'navbaractive' : 'navbar'} ref={divRef}>
            <h1 className="navbar-logo" onClick={() => scroll.scrollToTop()}>
                MoBify
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
                    <span>{totalQty}</span>
                </div>
                <div className={open ? 'sidemenu active' : 'sidemenu'}>
                <Scrollbars style={{ width: "100%", height: "100%"}}>
                    <h1>Shopping Cart</h1>
                    <button className="closebtn" onClick={openSlider}><CloseRoundedIcon /></button>
                <>
                <div className='cart-container' id="style-4">
                    {
                        shoppingCart.length === 0 && <>
                            <div>Cart is empty!</div>
                        </>
                    }
                </div>
                {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>
                            <div className="cart-items">
                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                               <ArrowUpwardIcon />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                               <ArrowDownwardIcon/>
                            </div>
                            </div>
                            <div className='cart-price'>
                                Rs {cart.TotalProductPrice}
                            </div>
                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <DeleteIcon />
                            </button>
                        </div>
                    ))
                    }
                   {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price: </span>
                            <span>Rs {totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty: </span>
                            <span>{totalQty}</span>
                        </div>
                            <button className='btn' style={{ marginTop: 10 + 'px' }} onClick={() => checkout.show({amount: 1000})}>
                                Checkout
                        </button>
                    </div>
                    }
                </>
                </Scrollbars>
                </div>
                <div>
                {isLoggedIn  ? logoutLink : loginLink}
                </div>
            </div>
        </div>
        
    )

}

export default Navbar
