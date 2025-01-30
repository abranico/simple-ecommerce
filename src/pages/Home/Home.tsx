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
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ListOfProducts from "@/components/ListOfProducts";
import { CarIcon, PersonStanding, RocketIcon, ShieldCheck } from "lucide-react";
import useProducts from "@/hooks/useProducts";

const Home = () => {
  const { productss } = useProducts();
  console.log(productss);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const featuredProducts = products.slice(0, 6);
  const recommendedProducts = products.slice(6, 12);
  const [count, setCount] = useState(0);
  const navigator = useNavigate();

  const handleTransition = () => {
    document.startViewTransition(() => {
      setCount(count + 1);
    });
  };

  // useEffect(() => {
  //   const url = "https://fakestoreapi.com/products";
  //   const abortController = new AbortController();
  //   console.log("inicio");
  //   fetch(url, { signal: abortController.signal })
  //     .then((response) => {
  //       if (!response.ok) throw new Error();
  //       return response.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) =>
  //       console.log({ "Un error ha ocurrido: ": error.message })
  //     )
  //     .finally(() => console.log("finalizo"));
  //   return () => abortController.abort();
  // }, []);

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
        <ol className="px-4 md:px-14 flex flex-col md:flex-row justify-center gap-6 bg-zinc-50 py-5 rounded-lg ">
          <li className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CarIcon size={40} className="text-pink-400 mb-3" />
            <strong className="text-lg font-semibold text-gray-800">
              Fast Delivery
            </strong>
            <p className="text-gray-600">Deliveries in less than 2 days.</p>
          </li>
          <li className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow-sm border-x hover:shadow-md transition-shadow">
            <ShieldCheck size={40} className="text-pink-400 mb-3" />
            <strong className="text-lg font-semibold text-gray-800">
              Safe Payment
            </strong>
            <p className="text-gray-600">All payments are 100% secure</p>
          </li>
          <li className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <PersonStanding size={40} className="text-pink-400 mb-3" />
            <strong className="text-lg font-semibold text-gray-800">
              Friendly Services
            </strong>
            <p className="text-gray-600">Best customer care services</p>
          </li>
        </ol>
      </header>
      <section className="px-4 md:px-14 mt-10  py-5">
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h2 className="text-xl md:text-3xl text-gray-700  ">
            Featured Products
          </h2>
          <Link
            to=""
            className="text-md md:text-xl  underline text-gray-500 hover:text-black "
          >
            See all
          </Link>
        </div>
        <ListOfProducts products={featuredProducts} />
      </section>
      <section className="px-4 md:px-14 mt-16  py-5">
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h2 className="w-[50px] sm:w-full text-xl md:text-3xl text-gray-700 ">
            Recommended Products
          </h2>
          <Link
            to=""
            className="w-full text-end text-md md:text-xl  underline text-gray-500 hover:text-black  "
          >
            See all
          </Link>
        </div>
        <ListOfProducts products={recommendedProducts} />
      </section>
    </motion.div>
  );
};

export default Home;
