import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AuthContextProvider from "./context/auth.context.tsx";

import { RouterProvider } from "react-router-dom";
import CartContextProvider from "./context/cart.context.tsx";
import router from "@/routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
