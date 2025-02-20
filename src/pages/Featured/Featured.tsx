import ListOfProducts from "@/components/ListOfProducts";
import { useProducts } from "@/context/products";

import { motion } from "framer-motion";

const Featured = () => {
  const { products } = useProducts();
  const featuredProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <header className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white py-8 sm:py-12 px-6 sm:px-12 shadow-lg text-center">
        <h2 className="uppercase text-2xl sm:text-5xl font-bold tracking-wide">
          Featured Products
        </h2>
        <p className="mt-3 sm:mt-5 text-sm sm:text-lg font-light max-w-2xl mx-auto">
          Discover our latest and most popular products, carefully selected for
          you. High quality, great design, and unbeatable prices.
        </p>
      </header>

      {/* Featured Products Section */}
      <main className="px-4 md:px-14 mt-12">
        <ListOfProducts products={featuredProducts} />
      </main>
    </motion.section>
  );
};

export default Featured;
