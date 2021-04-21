import React, { useEffect, useState } from 'react'
import './Product.css'
import { ProductData } from './ProductData'


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


    return (
        <>
        <div className="filter">
        <h1>Products</h1>
        <div className="filter-sort">
          Order{" "}
          <select>
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
                <div className="card" key={item.id}>
                <img className="card_img" src={item.image} alt="" />
                <div className="card_header">
                  <h2>{item.title}</h2>
                  {/* <p>{item.description}</p> */}
                  <p className="price">{item.price}</p>
                  <div className="btn">Add to cart</div>
                </div>
              </div>
            );
          })}
      </div>
            </> 
    )
}

export default Product
