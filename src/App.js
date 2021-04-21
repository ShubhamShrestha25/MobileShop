import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";
import Product from "./components/product/Product";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero slides={SliderData} />
      <Product />
    </div>
  );
}

export default App;
