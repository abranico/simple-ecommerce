import type { IProduct } from "@/models/product.model";
import Product from "./Product";
import { useProducts } from "@/context/products";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({ products }) => {
  const { isLoading } = useProducts();

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-8">
      {isLoading
        ? Array.from({ length: 6 }, (_, i) => (
            <ProductSkeleton key={i} size="sm" />
          ))
        : products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price}
              size="lg"
              rating={product.rating.rate}
            />
          ))}
    </ul>
  );
};

export default ListOfProducts;

const ProductSkeleton = ({ size }: { size: "lg" | "sm" }) => (
  <li className="w-full h-full hover:scale-105 group transition-all duration-600 border-gray-200 rounded-lg overflow-hidden shadow-black/30 shadow animate-pulse bg-gray-100">
    <div
      className={`w-full ${size === "lg" ? "h-52" : "h-40"} bg-gray-300`}
    ></div>
    <div className="rounded-b-lg text-sm font-medium text-gray-800 px-2 py-1 flex flex-col gap-2">
      <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
      <div className="h-10 w-full bg-gray-300 rounded"></div>
      <div className="flex justify-between items-center mt-auto">
        <div className="h-4 w-10 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  </li>
);
