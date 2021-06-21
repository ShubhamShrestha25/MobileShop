
const CartReducer = (state, action) => {
    const {shoppingCart, totalPrice, totalQty} = state;

    let product;
    let index;
    let updatedPrice;
    let updateQty

    switch(action.type){
        case 'ADD_to_CART':
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if(check){
                console.log("Product is alreay in your cart")
                return state;
            }
             else {
                 product = action.product;
                 product['qty'] = 1;
                 product['TotalProductPrice'] = product.ProductPrice * product.qty;
                 updateQty = totalQty + 1;
                 updatedPrice = totalPrice + product.ProductPrice;
                 return{
                     shoppingCart:[product,...shoppingCart], totalPrice: updatedPrice, totalQty: updateQty
                 }
             }
             break;
    }
}

export default CartReducer
