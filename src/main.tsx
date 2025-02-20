import router from "@/routes/routes.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/auth.context.tsx";
import CartContextProvider from "./context/cart.context.tsx";
import ProductsContextProvider from "./context/products.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ProductsContextProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </ProductsContextProvider>
);
