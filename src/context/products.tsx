import Loader from "@/components/Loader";
import { IProduct } from "@/models/product.model";
import { getProducts } from "@/services/products";
import { createContext, useContext, useEffect, useState } from "react";

interface Context {
  products: IProduct[];
  isLoading: boolean;
}

export const ProductsContext = createContext<undefined | Context>(undefined);

export default function ProductsContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://fakestoreapi.com/products", {
      signal: abortController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to request products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);
  //   78 solicitudes
  // 6,7 kB transferidos
  // 4,9 MB recursos
  // Finalizar: 7,32 s

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("context must be used within a ProductsContextProvider");
  return context;
};
