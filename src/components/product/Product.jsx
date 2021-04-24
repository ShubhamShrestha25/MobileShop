import React, { useEffect, useState } from "react";
import "./Product.css";
import { ProductData } from "./ProductData";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const latestProducts = [...ProductData];

const Product = () => {
  const [filter, setFilter] = useState({
    filter: "All",
    products: [...ProductData],
  });
  const [brand, setBrand] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    let brandArray = [];
    ProductData.map((item) => brandArray.push(item.brand));
    brandArray = new Set(brandArray);
    setBrand(["All", ...brandArray]);
  }, []);

  const sortProducts = (event) => {
    if (event.target.value === "lowest") {
      const lowestPriceProduct = ProductData.sort((a, b) => {
        return a.price - b.price;
      });
      setFilter({ filter: event.target.value, products: lowestPriceProduct });
    } else if (event.target.value === "highest") {
      const heighestPriceProduct = ProductData.sort((a, b) => {
        return b.price - a.price;
      });
      setFilter({ filter: event.target.value, products: heighestPriceProduct });
    } else {
      setFilter({ filter: event.target.value, products: latestProducts });
    }
  };

  const filterProducts = (event) => {
    if (event.target.value === "All") {
      setFilter({ filter: event.target.value, products: ProductData });
    } else {
      setFilter({
        filter: event.target.value,
        products: ProductData.filter(
          (product) => product.brand.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (id) => {
    setModalOpen(true);
    const singleProduct = ProductData.find((product) => product.id === id);
    setSingleProduct(singleProduct);
  };

  return (
    <>
      <div className="filter">
        <h1>Products</h1>
        <div className="filter-sort">
          Order{" "}
          <select value={filter.filter} onChange={sortProducts}>
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
          <div className="filer-size">
            Filter{" "}
            <select
              name="brand"
              value={filter.filter}
              onChange={filterProducts}
            >
              {brand !== undefined
                ? brand.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        </div>
      </div>
      <div className="main_content">
        {filter.products &&
          filter.products.map((item) => {
            return (
              <Fade>
                <div className="card" key={item.id}>
                  <img
                    className="card_img"
                    src={item.image}
                    alt=""
                    onClick={() => openModal(item.id)}
                  />
                  <div className="card_header">
                    <h2>{item.title}</h2>
                    <p className="price"> Rs {item.price}</p>
                    <div className="btn">Add to cart</div>
                  </div>
                </div>
              </Fade>
            );
          })}
      </div>
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <Zoom >
        <button className="closeModal" onClick={() => setModalOpen(false)}>X</button>
        <div className="product_details">
          <img src={singleProduct.image} alt={singleProduct.title} />
          <div className="product_details_description">
          <p> <strong>{singleProduct.title}</strong></p>
          <p> {singleProduct.description}</p>
          <div className="product_price">
          <div><strong><p>Rs {singleProduct.price}</p></strong></div>
          <button className="btn" onClick={() => setModalOpen(false)}>Add to cart</button>
          </div>
          </div>
        </div>
        </Zoom>
      </Modal>
    </>
  );
};

export default Product;
