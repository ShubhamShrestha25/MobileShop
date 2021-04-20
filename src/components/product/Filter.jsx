import React, { useState } from 'react'
import './Filter.css'
import { ProductData } from './ProductData'
const Filter = () => {

    const [filter, setFilter] = useState('')

    const filterProducts = (event) => {
        if(event.target.value === "") {
            setFilter({filter: event.target.value, product: ProductData})
        } else {
            setFilter ({
                filter: event.target.value,
                products: ProductData.filter(product => product.brand.indexOf(event.target.value) >=0 ),
               })
        }
        console.log(filterProducts)
    }

    return (
        <div className="filter">
            <h1>Products</h1>
            <div className="filter-sort">
                Order {" "}
                <select >
                    <option>Latest</option>
                    <option>Lowest</option>
                    <option>Highest</option>
                </select>
                <div className="filer-size" >
                    Filter {" "}
                    <select value={filter} onChange={filterProducts}>
                        <option value="">All</option>
                        <option value="Iphone">Iphone</option>
                        <option value="Samsung">Samsung</option>
                        <option value="OnePlus">OnePlus</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Realme">Realme</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter
