import { Home } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/theme.context";
import Shop from "./pages/Shop/Shop";
import CartContextProvider from "./context/cart.context";

function App() {
  return (
    <CartContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CartContextProvider>
  );
}

export default App;
