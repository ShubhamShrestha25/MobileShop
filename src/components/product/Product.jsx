import React from 'react'
import './Product.css'

const Product = ({items}) => {
    return (
            <div className="main_content">
                {items.map((item) =>{
                    return(
                    <div className="card" key={item.id}>
                        <img className="card_img" src={item.image} alt=""/>    
                        <div className="card_header">
                            <h2>{item.title}</h2>
                            {/* <p>{item.description}</p> */}
                            <p className="price">{item.price}</p>
                            <div className="btn">Add to cart</div>
                        </div>
                    </div>
                )})}
            </div> 
    )
}

export default Product
