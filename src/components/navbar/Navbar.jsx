import React, { useState } from 'react'
import { MenuItems } from './MenuItems'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { animateScroll as scroll, Link } from 'react-scroll';



const Navbar = () => {
    
    // const [navbar, setNavbar] = useState(false)
    // const changeBackground = () => {
    //     if(window.scrollY > 100) {
    //         setNavbar(true)
    //     }
    //     else {
    //         setNavbar(false)
    //     }
    // }

    // window.addEventListener('scroll', changeBackground)

    const [clicked, setclicked] = useState(false)
    const clickHandler = () =>{
        setclicked (!clicked);
    }

    const [open, setOpen] = useState(false)
    const openSlider = () => {
        setOpen (!open)
    }
  
    return (
        <div className='navbar'>
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
            <div className="rightIcons" >
                 <ShoppingCartIcon onClick={openSlider} />
             </div>
            <div  className={open? 'sidemenu active' : 'sidemenu'}>
             <h1>Shopping Cart</h1>
            <button className="closebtn" onClick={openSlider}>X</button>
            </div>  
        </div>
    )
    
}

export default Navbar
  