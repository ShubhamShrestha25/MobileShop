import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/navbar/Navbar";
import { SliderData } from "./components/Hero/SliderData";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero slides={SliderData} />
    </div>
  );
}

export default App;
