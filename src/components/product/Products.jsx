import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../global/ProductsContext'
import './Product.css'
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import SearchIcon from '@material-ui/icons/Search';
import { CartContext } from '../global/CartContext';

 const Products = () => {

    const { products } = useContext(ProductsContext); 

      const {dispatch} = useContext(CartContext)

    // Filtering order \\
    const [filter, setFilter] = useState({
        filter: "All",
        productss: [...products],
      });

      const sortProducts = (event) => {
        if (event.target.value === "lowest") {
          const lowestPriceProduct = products.sort((a, b) => {
            return a.ProductPrice - b.ProductPrice;
          });
          setFilter({ filter: event.target.value, productss: lowestPriceProduct });
        } if (event.target.value === "highest") {
          const heighestPriceProduct = products.sort((a, b) => {
            return b.ProductPrice - a.ProductPrice;
          })
          setFilter({ filter: event.target.value, productss: heighestPriceProduct });
        } if (event.target.value === "latest") {
          const latestPriceProduct = products.sort((a, b) => {
            return a.ProductsID - b.ProductsID;
          })
            setFilter({ filter: event.target.value, productss: latestPriceProduct });
        }
      };

      // Filtering Brand \\
      const [brand, setBrand] = useState([]);

      useEffect(() => {
        let brandArray = [];
        products.map((item) => brandArray.push(item.ProductBrand));
        brandArray = new Set(brandArray);
        setBrand(["All", ...brandArray]);
      }, [products]);

      const filterBrands = (event) => {
        if (event.target.value === "All") {
          setFilter({ filter: event.target.value, products: products });
        } else {
          setFilter({
            filter: event.target.value,
            products: products.filter(
              (product) => product.brand.indexOf(event.target.value) >= 0
            ),
          });
        }
      };


      // Modal \\
      const [modalOpen, setModalOpen] = useState(false);
      const [singleProduct, setSingleProduct] = useState([]);

      const customStyles = {
        content: {
          top: '55%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          width: '80%',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden'
        },
      };

    const openModal = (id) => {
    setModalOpen(true);
    const singleProduct = products.find((product) => product.ProductID === id);
    setSingleProduct(singleProduct);
  };
    
    // search \\

    const [search, setSearch] = useState("")

    const searchHandler = (e) => {
      setSearch(e.target.value)
    }


    return (
        <div className="products" id="product">
            <h1>Products</h1>
            <div className="filter">
            <div className="Order">
            Order{" "}
            <select value={filter.filter} onChange={sortProducts}>
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
            </div>
            <div className="brand">
            Brand{" "}
            <select
              name="brand"
              value={filter.filter}
              onChange={filterBrands}
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
            <div className="searchbar">
              <div className="search">
                <input type="text" placeholder="Search" className="searchBox" onChange={searchHandler}/>
                  <SearchIcon className="search-icon"/>
              </div>
            </div>
            <div className='products-container'>
                {products.filter((val) => {
                  if (search === ""){
                    return val
                  } if (val.ProductName.toLowerCase().includes(search.toLowerCase())){
                    return val
                  }
                }).map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div>
                            <img src={product.ProductImg} alt="not found" onClick={() => openModal(product.ProductID)}/>
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Rs {product.ProductPrice}
                    </div>
                        <button className='btn' onClick = {() => (dispatch({type: 'ADD_to_CART', id: product.ProductID,product}))}>ADD TO CART</button>
                    </div>
                ))}
            </div>
            
      <Modal  isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} ariaHideApp={false} style={customStyles} >
        <Zoom >
        <button className="closeModal" onClick={() => setModalOpen(false)}>X</button>
        <div className="product_details">
          <img src={singleProduct.ProductImg} alt={singleProduct.ProductName} />
          <div className="product_details_description">
          <p> <strong>{singleProduct.ProductName}</strong></p>
          <p> {singleProduct.ProductDetails}</p>
          <div className="product_price">
          <div><strong><p>Rs {singleProduct.ProductPrice}</p></strong></div>
          <button className="product_btn" onClick = {() => (dispatch({type: 'ADD_to_CART', id: singleProduct.ProductID,singleProduct}))}>Add to cart</button>
          </div>
          </div>
        </div>
        </Zoom>
      </Modal>
        </div>
    )
}

export default Products