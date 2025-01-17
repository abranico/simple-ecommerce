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
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ListOfProducts from "@/components/ListOfProducts";

const Home = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const featuredProducts = products.slice(0, 5);
  const recommendedProducts = products.slice(5, 10);
  const [count, setCount] = useState(0);
  const navigator = useNavigate();

  const handleTransition = () => {
    document.startViewTransition(() => {
      setCount(count + 1);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado final
      transition={{ duration: 0.5 }}
    >
      <header className="">
        <Carousel plugins={[plugin.current]} className="relative">
          <CarouselContent
            className="cursor-pointer"
            onClick={() => navigator("/shop")}
          >
            {[
              { src: "banner1.webp", alt: "Banner 1" },
              { src: "banner6.jpg", alt: "Banner 6" },
              { src: "banner7.jpg", alt: "Banner 7" },
            ].map((banner, index) => (
              <CarouselItem key={index} className="p-0 w-full max-h-[320px] ">
                <img
                  className="w-full h-auto max-h-[320px] object-fill"
                  src={banner.src}
                  alt={banner.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute left-0 ml-14" />
          <CarouselNext className="hidden md:flex absolute right-0 mr-14" />
        </Carousel>
      </header>
      <section className="px-14 mt-16">
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h2 className="text-3xl text-gray-700 ">Featured Products</h2>
          <Link
            to=""
            className="text-xl underline text-gray-500 hover:text-black "
          >
            See all
          </Link>
        </div>
        <ListOfProducts products={featuredProducts} />
      </section>
      <section className="px-14 mt-16">
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h2 className="text-3xl text-gray-700 ">Recommended Products</h2>
          <Link
            to=""
            className="text-xl underline text-gray-500 hover:text-black "
          >
            See all
          </Link>
        </div>
        <ListOfProducts products={recommendedProducts} />
      </section>
      <button onClick={handleTransition}>{count}</button>
    </motion.div>
  );
};

export default Home;
