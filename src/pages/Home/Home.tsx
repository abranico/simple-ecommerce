import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import products from "@/mocks/products.json";
const Home = () => {
  return (
    <div className="flex justify-center  mt-2 p-10">
      <div className="w-2/3 relative h-full bg-black">
        <Carousel className="h-full">
          <CarouselContent className="h-full">
            {products.slice(0, 3).map((product) => (
              <CarouselItem
                key={product.id}
                className="relative flex flex-col justify-end h-full"
              >
                <div className="flex-1 h-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full max-h-[521px]"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full">
                  <h2 className="text-xl md:text-3xl font-bold text-white mt-2">
                    {product.title}
                  </h2>
                  <div className="flex items-center mt-1 md:mt-2">
                    <span className="text-yellow-400 text-lg md:text-2xl">
                      ★ {product.rating.rate}
                    </span>
                    <span className="text-white text-sm md:text-xl ml-2 md:ml-4"></span>
                  </div>
                  <p className="text-white mt-2 md:mt-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
        </Carousel>
      </div>

      {/* Lista de otros lanzamientos */}
      <div className="w-1/3 p-4 overflow-y-auto ">
        <div className="space-y-4">
          {products.slice(3, 6).map((product) => (
            <div key={product.id} className="flex">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-24 object-cover"
              />
              <div className="ml-4">
                <h4 className="text-white text-lg font-bold line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">
                    ★ {product.rating.rate || "N/A"}
                  </span>
                </div>
                <p className="text-white mt-1 line-clamp-2">
                  {product.description}
                </p>
                <button className="mt-2 text-sm text-yellow-400">
                  Watch now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
