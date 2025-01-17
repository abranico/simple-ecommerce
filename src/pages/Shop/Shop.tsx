import products from "@/mocks/products.json";

import { useState } from "react";
import Product from "../../components/Product";
import Filters from "./components/filters/Filters";
import { motion } from "framer-motion";
import useFilter from "./hooks/useFilter";
const Shop = () => {
  const { sortedProducts, handleFilters, filter } = useFilter(products);
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 0.5 }}
      className="flex mt-10 px-14"
    >
      <Filters onFilter={handleFilters} filter={filter} />

      <main className="px-14 w-2/3">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-8">
          {sortedProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price}
              size="md"
              cart={false}
              rating={product.rating.rate}
            />
          ))}
        </ul>
      </main>
    </motion.section>
  );
};

export default Shop;
