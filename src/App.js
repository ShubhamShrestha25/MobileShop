import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";
import { ProductsContextProvider } from "./components/global/ProductsContext";
import { CartContextProvider } from "./components/global/CartContext";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Products from "./components/product/Products";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./components/khalti/KhaltiConfig";

function App() {
  let checkout = new KhaltiCheckout(config);

  return (
    <div className="App">
      <ProductsContextProvider>
        <CartContextProvider>
          <Navbar checkout={checkout} />
          <Hero slides={SliderData} />
          <Products />
          <Services />
          <Contact />
          <Footer />
        </CartContextProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
