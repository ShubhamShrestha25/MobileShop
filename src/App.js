import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";
import Product from "./components/product/Product";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero slides={SliderData} />
      <Product />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
