import React, { useEffect, useState } from 'react'
import './Product.css'
import { ProductData } from './ProductData'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'


const Product = () => {
    const [filter, setFilter] = useState({
        filter: 'All',
        products: [...ProductData],
    });
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        let brandArray = [];
        ProductData.map((item) => brandArray.push(item.brand));
        brandArray = new Set (brandArray);
        setBrand(['All', ...brandArray]);
    }, []);


    const sortProducts = (event) => {
       
    }

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

      const [modalOpen, setModalOpen] = useState(false)
      
      const openModal = () => {
        setModalOpen(true)
      }

    return (
      
        <>
        <div className="filter">
        <h1>Products</h1>
        <div className="filter-sort">
          Order{" "}
          <select onChange={sortProducts}>
            <option>Latest</option>
            <option>Lowest</option>
            <option>Highest</option>
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
                <img className="card_img" src={item.image} alt="" onClick={openModal}/>
                <div className="card_header">
                  <h2>{item.title}</h2>
                  {/* <p>{item.description}</p> */}
                  <p className="price"> Rs {item.price}</p>
                  <div className="btn">Add to cart</div>
                </div>
              </div>
              </Fade>
            )
          })}    
      </div>
          <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)}>
            {
              ProductData.map((item) =>{
                return(
                  <div key={item.id}>
                    <img src={item.image} alt=""/>
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                  </div>
                )
              }
              )
            }
            <button onClick={()=> setModalOpen(false)}>X</button>
          </Modal>
            </> 
    )
}

export default Product
