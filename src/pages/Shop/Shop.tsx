import products from "@/mocks/products.json";

import { useState } from "react";
import Product from "../../components/Product";
import Filters from "./components/filters/Filters";
import { motion } from "framer-motion";
import useFilter from "./hooks/useFilter";
import ListOfProducts from "@/components/ListOfProducts";
import { Filter, ListFilter } from "lucide-react";
import {
  Button,
  SearchInput,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components";
const Shop = () => {
  const { sortedProducts, handleFilters, filter } = useFilter(products);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 0.5 }}
      className="mt-5 px-4 md:px-14"
    >
      <header className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
          Shop
        </h2>
        <div className="flex gap-3 max-w-xl w-full">
          <button className="lg:hidden" onClick={() => setShowFilters(true)}>
            <FilterMenu handleFilters={handleFilters} filter={filter} />
          </button>
          <SearchInput />
        </div>
      </header>

      <main className="mt-14 lg:flex ">
        <div className="hidden lg:block w-1/3 ">
          <Filters onFilter={handleFilters} filter={filter} />
        </div>
        <div className="lg:w-2/3">
          <ListOfProducts products={sortedProducts} />
        </div>
        {/* <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-8">
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
        </ul> */}
      </main>
    </motion.section>
  );
};

export default Shop;

const FilterMenu = ({ handleFilters, filter }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <ListFilter />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-auto">
        <Filters onFilter={handleFilters} filter={filter} />
      </SheetContent>
    </Sheet>
  );
};
