import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";
import Product from "./components/product/Product";
import { ProductData } from "./components/product/ProductData";
import Filter from "./components/product/Filter";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero slides={SliderData} />
      <Filter
      />
      <Product items={ProductData} />
    </div>
  );
}

export default App;
