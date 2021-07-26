import React, { useRef, useState, useContext, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { animateScroll as scroll, Link } from "react-scroll";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { auth, db, provider, storage } from "../Firebase";
import { CartContext } from "../global/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Scrollbars } from "react-custom-scrollbars";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import IdleTimer from "react-idle-timer";

const safeDocument = typeof document !== "undefined" ? document : {};
const loginFromLocalStorage = JSON.parse(
  localStorage.getItem("login") || false
);

const Navbar = ({ handleNextButton }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);

  // navbar color change \\
  const html = safeDocument.documentElement;
  const divRef = useRef(null);

  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const multipleFunction = () => {
    setclicked(!clicked);
    html.style.overflowY = "scroll";
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

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

  const [isLoggedIn, setIsLoggedIn] = useState(loginFromLocalStorage);
  const loginHandler = async () => {
    await auth.signInWithPopup(provider);
    toast.success("Login Successful", {
      autoClose: 3000,
    });
    setIsLoggedIn(!isLoggedIn);
  };

  const logoutHandler = async () => {
    await auth.signOut();
    toast.error("Logout Successful", {
      autoClose: 3000,
    });
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const idleTimerRef = useRef(null);

  const onIdle = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
  };

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userPhoto: "",
    uid: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          userName: user.displayName,
          userPhoto: user.photoURL,
          uid: user.uid,
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

  // dropdown menu  \\
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownHandler = () => {
    setDropDownOpen(!dropDownOpen);
  };

  // Add products\\
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [productDetails, setProductDetails] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productsId, setProductsID] = useState(0);
  const [error, setError] = useState("");
  const [openDropDownModal, setOpenDropDownModal] = useState(false);

  const types = ["image/png", "image/jpeg"]; // image types

  const addProductPopUp = () => {
    setOpenDropDownModal(!openDropDownModal);
  };

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // my orders \\
  const [openOrderDropDownModal, setOrderOpenDropDownModal] = useState(false);
  const orderPopUp = () => {
    setOrderOpenDropDownModal(!openOrderDropDownModal);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => setError(err.message),
      () => {
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductsID: Number(productsId),
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductBrand: productBrand,
                ProductQuantity: Number(productQuantity),
                ProductRating: Number(productRating),
                ProductDetails: productDetails,
                ProductImg: url,
              })
              .then(() => {
                setProductsID(0);
                setProductName("");
                setProductPrice(0);
                setProductBrand("");
                setProductQuantity(0);
                setProductRating(0);
                setProductDetails("");
                setProductImg("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  // getting data from firebase \\

  const [myOrder, setMyOrder] = useState([]);
  const [admins, setAdmins] = useState([]);
  const orderData = firebase.firestore().collection("orders");
  const adminData = firebase.firestore().collection("admin");

  const getAdmin = () => {
    adminData.onSnapshot((querySnapshot) => {
      const texts = [];
      querySnapshot.forEach((doc) => {
        texts.push(doc.data());
      });
      setAdmins(texts);
    });
  };

  const getOrders = () => {
    orderData.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMyOrder(items);
    });
  };

  const deleteOrder = () => {
    orderData.doc().delete();
  };

  useEffect(() => {
    getOrders();
    getAdmin();
  });

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
                                onClick={() => handleNextButton({ totalPrice })}
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
              <div>
                <h1 onClick={orderPopUp}>My Orders</h1>
                {openOrderDropDownModal && (
                  <div className="add-products-details">
                    <div
                      onClick={orderPopUp}
                      className="add-products-overlay"
                    ></div>
                    <div className="orders-details-content">
                      <div className="order-header">
                        <div className="order-id">Order ID</div>
                        <div className="order-number">Order Number</div>
                        <div className="order-status">Status</div>
                        <div className="order-amount">Amount</div>
                      </div>
                      {myOrder.map((order) => (
                        <div key={order.orderID}>
                          {userInfo.uid === order.userIDs ? (
                            <div className="order-details">
                              <div className="order-id">{order.orderID}</div>
                              <div className="order-number">
                                {order.mobileNum}
                              </div>
                              <div className="order-status">
                                {order.deliveryStatus === "pending" ? (
                                  <p style={{ color: "red" }}>
                                    {order.deliveryStatus}
                                  </p>
                                ) : (
                                  <p style={{ color: "green" }}>
                                    {order.deliveryStatus}
                                  </p>
                                )}
                              </div>
                              <div className="order-amount">
                                {order.orderAmount}
                              </div>
                              <DeleteIcon
                                onClick={deleteOrder}
                                style={{ color: "red" }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                      {error && <span className="error-msg">{error}</span>}
                      <button className="closebtn" onClick={orderPopUp}>
                        <CloseRoundedIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {admins.map((admin) => (
                  <div key={admin.AdminID}>
                    {userInfo.uid === admin.AdminID ? (
                      <div>
                        <h1
                          onClick={() => {
                            addProductPopUp();
                          }}
                        >
                          Add Products
                        </h1>
                        {openDropDownModal && (
                          <div className="add-products-details">
                            <div
                              onClick={addProductPopUp}
                              className="add-products-overlay"
                            ></div>
                            <div className="add-products-details-content">
                              <form
                                autoComplete="off"
                                className="form-group"
                                onSubmit={addProduct}
                              >
                                <label htmlFor="product-id">Product ID</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductsID(e.target.value)
                                  }
                                  value={productsId}
                                />
                                <br />
                                <label htmlFor="product-name">
                                  Product Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductName(e.target.value)
                                  }
                                  value={productName}
                                />
                                <br />
                                <label htmlFor="product-price">
                                  Product Price
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductPrice(e.target.value)
                                  }
                                  value={productPrice}
                                />
                                <br />
                                <label htmlFor="product-brand">
                                  Product Brand
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductBrand(e.target.value)
                                  }
                                  value={productBrand}
                                />
                                <br />
                                <label htmlFor="product-quantity">
                                  Product Quantity
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductQuantity(e.target.value)
                                  }
                                  value={productQuantity}
                                />
                                <br />
                                <label htmlFor="product-rating">
                                  Product Rating
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductRating(e.target.value)
                                  }
                                  value={productRating}
                                />
                                <br />

                                <label htmlFor="product-details">
                                  Product details
                                </label>
                                <textarea
                                  className="form-control"
                                  required
                                  onChange={(e) =>
                                    setProductDetails(e.target.value)
                                  }
                                  value={productDetails}
                                />
                                <br />
                                <label htmlFor="product-img">
                                  Product Image
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="file"
                                  required
                                  onChange={productImgHandler}
                                />
                                <br />
                                <button type="submit" className="add-btn">
                                  ADD
                                </button>
                              </form>
                              {error && (
                                <span className="error-msg">{error}</span>
                              )}
                              <button
                                className="closebtn"
                                onClick={addProductPopUp}
                              >
                                <CloseRoundedIcon />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
              <h2 onClick={() => logoutHandler()}>Logout</h2>
            </ul>
          </div>
        </>
      ) : (
        <button className="login" onClick={() => loginHandler(provider)}>
          LogIn
        </button>
      )}
      <IdleTimer ref={idleTimerRef} timeout={15 * 60 * 1000} onIdle={onIdle} />
    </div>
  );
};
export default Navbar;
