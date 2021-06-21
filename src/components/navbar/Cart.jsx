import React, { useContext } from 'react'
import { CartContext } from '../global/CartContext'

const Cart = () => {
    const data = useContext(CartContext)
    console.log(data)
    return (
        <div>
            
        </div>
    )
}

export default Cart
