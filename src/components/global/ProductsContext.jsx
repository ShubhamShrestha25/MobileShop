import React, { createContext } from "react";
import { db } from "../Firebase";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const prevProducts = this.state.products;
    db.collection("Products").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          prevProducts.push({
            ProductID: change.doc.id,
            ProductsID: change.doc.data().ProductsID,
            ProductName: change.doc.data().ProductName,
            ProductPrice: change.doc.data().ProductPrice,
            ProductImg: change.doc.data().ProductImg,
            ProductColors: change.doc.data().ProductColors,
            ProductDetails: change.doc.data().ProductDetails,
            ProductBrand: change.doc.data().ProductBrand,
            ProductRating: change.doc.data().ProductRating,
          });
        }
        this.setState({
          products: prevProducts,
        });
      });
    });
  }
  render() {
    return (
      <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}
