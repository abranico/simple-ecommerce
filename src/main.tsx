import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./context/auth.context.tsx";
import { RouterProvider } from "react-router-dom";
import CartContextProvider from "./context/cart.context.tsx";
import router from "@/routes/routes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
