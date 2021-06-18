import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";
import { ProductsContextProvider } from "./components/product/ProductsContext";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Products from "./components/product/Products";

function App() {
  return (
    <div className="App">
      <ProductsContextProvider>
        <Navbar />
        <Hero slides={SliderData} />
        <Products />
        <Services />
        <Contact />
        <Footer />
      </ProductsContextProvider>
    </div>
  );
}

export default App;
