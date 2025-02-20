import { lazy, Suspense } from "react";
import App from "@/App.tsx";
import { Home } from "@/pages/index.ts";
import ProductView from "@/pages/ProductView/ProductView.tsx";
import Cart from "@/pages/Cart/Cart.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import Featured from "@/pages/Featured/Featured";
import Recommended from "@/pages/Recommended/Recommended";

const Shop = lazy(() => import("@/pages/Shop/Shop"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Register = lazy(() => import("@/pages/Register/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "shop",
        element: (
          <Suspense fallback="Cargando...">
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "featured",
        element: <Featured />,
      },
      {
        path: "recommended",
        element: <Recommended />,
      },
      {
        path: "product/:id",
        element: <ProductView />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback="Cargando...">
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="Cargando...">
            <Register />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
