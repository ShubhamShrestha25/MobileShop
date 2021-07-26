import "./App.css";
import { ProductsContextProvider } from "./components/global/ProductsContext";
import { CartContextProvider } from "./components/global/CartContext";
import AppWrapper from "./components/AppWrapper";

function App() {

  return (
    <div className="App">
      <ProductsContextProvider>
        <CartContextProvider>
          <AppWrapper />
        </CartContextProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
