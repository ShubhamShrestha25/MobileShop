import React, { useRef, useState, useContext, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { animateScroll as scroll, Link } from "react-scroll";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { auth, db, provider } from "../Firebase";
import { CartContext } from "../global/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Scrollbars } from "react-custom-scrollbars";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../khalti/KhaltiConfig";
import firebase from "firebase/app";
import { toast } from "react-toastify";

const safeDocument = typeof document !== "undefined" ? document : {};

const Navbar = () => {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);

  // navbar color change \\
  const html = safeDocument.documentElement;
  const divRef = useRef(null);

  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
      divRef.current.className = "navbaractive";
    } else {
      setNavbar(false);
    }
  };

  const multipleFunction = () => {
    setclicked(!clicked);
    html.style.overflowY = "scroll";
  };

  window.addEventListener("scroll", changeBackground);

  const [clicked, setclicked] = useState(false);
  const clickHandler = () => {
    setclicked(!clicked);
    const class_name = divRef.current;
    if (clicked) {
      class_name.className = "navbar";
      html.style.overflowY = "scroll";
    } else {
      class_name.classList.add("add-background");
      html.style.overflowY = "hidden";
    }
  };

  // cart sidebar \\
  const [open, setOpen] = useState(false);
  const openSlider = () => {
    setOpen(!open);
  };

  // login & logout \\
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = async () => {
    await auth.signInWithPopup(provider);
    toast.success("Login Successful !!", {
      autoClose: 3000,
    });
    setIsLoggedIn(!isLoggedIn);
  };

  const logoutHandler = async () => {
    await auth.signOut();
    toast.error("Logout Successful !!", {
      autoClose: 3000,
    });
    setIsLoggedIn(!isLoggedIn);
  };

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userPhoto: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          userName: user.displayName,
          userPhoto: user.photoURL,
        });
      }
    });
  }, []);

  // Shopping Details \\

  const [details, setDetails] = useState(false);
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    location: "",
  });

  const toggleModal = () => {
    setDetails(!details);
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });

    if (
      user.fname.length > 1 &&
      user.lname.length > 1 &&
      user.location.length > 1
    ) {
      setDisable(false);
    }

    if (
      user.fname.length <= 1 ||
      user.lname.length <= 1 ||
      user.location.length <= 1 ||
      user.phone.length <= 8
    ) {
      setDisable(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("shipping")
      .add({
        fname: user.fname,
        lname: user.lname,
        location: user.location,
        phone: user.phone,
      })
      .then(() => {
        toggleModal();
      })
      .catch((error) => {
        alert(error.message);
      });

    setUser({
      fname: "",
      lname: "",
      phone: "",
      location: "",
    });
  };

  //khalti\\
  const [khalti, setKhalti] = useState();
  useEffect(() => {
    let checkout = new KhaltiCheckout(config);
    setKhalti(checkout);
  }, []);

  // dropdown menu  \\
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownHandler = () => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <div className={navbar ? "navbaractive" : "navbar"} ref={divRef}>
      <h1 className="navbar-logo" onClick={() => scroll.scrollToTop()}>
        MoBify
      </h1>
      <div className="menu-icon" onClick={clickHandler}>
        {clicked ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={clicked ? "nav-menu active" : "nav-menu"}>
        <Link
          onClick={() => multipleFunction()}
          className="nav-links"
          to="home"
          smooth={true}
          duration={1000}
        >
          Home
        </Link>

        <Link
          onClick={() => multipleFunction()}
          className="nav-links"
          to="product"
          smooth={true}
          duration={1000}
        >
          Products
        </Link>

        <Link
          onClick={() => multipleFunction()}
          className="nav-links"
          to="service"
          smooth={true}
          duration={1000}
        >
          Service
        </Link>

        <Link
          onClick={() => multipleFunction()}
          className="nav-links"
          to="contact"
          smooth={true}
          duration={1000}
        >
          Contact
        </Link>

        <div className="basket">
          <ShoppingCartIcon onClick={openSlider} />
          <span>{totalQty}</span>
        </div>
      </div>
      <div>
        <div className={open ? "sidemenu active" : "sidemenu"}>
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <h1>Shopping Cart</h1>
            <button className="closebtn" onClick={openSlider}>
              <CloseRoundedIcon />
            </button>
            <>
              <div className="cart-container">
                {shoppingCart.length === 0 && (
                  <>
                    <div>Cart is empty!</div>
                  </>
                )}
              </div>
              {shoppingCart &&
                shoppingCart.map((cart) => (
                  <div className="cart-card" key={cart.ProductID}>
                    <div className="cart-img">
                      <img src={cart.ProductImg} alt="not found" />
                    </div>

                    <div className="cart-name">{cart.ProductName}</div>
                    <div className="cart-items">
                      <div
                        className="inc"
                        onClick={() =>
                          dispatch({ type: "INC", id: cart.ProductID, cart })
                        }
                      >
                        <ArrowUpwardIcon />
                      </div>

                      <div className="quantity">{cart.qty}</div>

                      <div
                        className="dec"
                        onClick={() =>
                          dispatch({ type: "DEC", id: cart.ProductID, cart })
                        }
                      >
                        <ArrowDownwardIcon />
                      </div>
                    </div>
                    <div className="cart-price">
                      Rs {cart.TotalProductPrice}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch({ type: "DELETE", id: cart.ProductID, cart })
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              {shoppingCart.length > 0 && (
                <div className="cart-summary">
                  <div className="cart-summary-heading">Cart-Summary</div>
                  <div className="cart-summary-price">
                    <span>Total Price: </span>
                    <span>Rs {totalPrice}</span>
                  </div>
                  <div className="cart-summary-price">
                    <span>Total Qty: </span>
                    <span>{totalQty}</span>
                  </div>
                  {isLoggedIn ? (
                    <button
                      className="btn"
                      style={{ marginTop: 10 + "px" }}
                      onClick={() => {
                        toggleModal();
                        openSlider();
                      }}
                    >
                      Checkout
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{ marginTop: 10 + "px" }}
                      onClick={() => {
                        loginHandler(provider);
                      }}
                    >
                      Checkout
                    </button>
                  )}
                  <div>
                    {details && (
                      <div className="details">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="details-content">
                          <form onSubmit={handleSubmit}>
                            <h2>Shipping Details</h2>
                            <div className="inputbox">
                              <input
                                type="text"
                                autoComplete="off"
                                name="fname"
                                required="required"
                                value={user.fname}
                                onChange={handleInputs}
                              />
                              <span>First Name</span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="text"
                                autoComplete="off"
                                name="lname"
                                required="required"
                                value={user.lname}
                                onChange={handleInputs}
                              />
                              <span>Last Name</span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="number"
                                autoComplete="off"
                                name="phone"
                                required="required"
                                value={user.phone}
                                onChange={handleInputs}
                              />
                              <span>Phone number</span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="text"
                                autoComplete="off"
                                name="location"
                                required="required"
                                value={user.location}
                                onChange={handleInputs}
                              />
                              <span>Address</span>
                            </div>
                            <div className="inputbox">
                              <button
                                type="submit"
                                disabled={disable}
                                onSubmit={toggleModal}
                                onClick={() => khalti.show({ amount: 1000 })}
                              >
                                Next
                              </button>
                            </div>
                          </form>
                          <button className="closebtn" onClick={toggleModal}>
                            <CloseRoundedIcon />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          </Scrollbars>
        </div>
      </div>
      {isLoggedIn ? (
        <>
          <div className="rightDropdown">
            <Avatar onClick={dropdownHandler} src={userInfo.userPhoto} />
            <ul className={dropDownOpen ? "dropdown active" : "dropdown"}>
              <h1>{userInfo.userName}</h1>
              <h2 onClick={() => logoutHandler()}>Logout</h2>
            </ul>
          </div>
        </>
      ) : (
        <button className="login" onClick={() => loginHandler(provider)}>
          LogIn
        </button>
      )}
    </div>
  );
};

export default Navbar;
