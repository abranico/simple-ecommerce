import Product from "@/components/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import products from "@/mocks/products.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Featured = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const featuredProducts = products.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <header className="bg-gray-100"></header>

      {/* Featured Products Section */}
      <section className="px-6 sm:px-10 lg:px-16 mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-sm sm:text-lg underline text-gray-500 hover:text-gray-800"
          >
            See all
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price}
              size="md"
              cart={true}
              rating={product.rating.rate}
            />
          ))}
        </ul>
      </section>
    </motion.div>
  );
};

export default Featured;
