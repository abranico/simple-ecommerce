import { getProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const { data: productss } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 15 * 1000,
  });

  return { productss };
};

export default useProducts;
