import Product from "@/components/Product";
import { useCart } from "@/context/cart.context";
import products from "@/mocks/products.json";
import { ArrowLeft, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ProductView = () => {
  const { id } = useParams();

  const product = products.find((product) => product.id == id);

  if (!product) return <div>No se encontro este producto</div>;

  const {
    id: productId,
    image,
    title,
    description,
    rating,
    category,
    price,
  } = product;

  const { cart, addToCart, removeFromCart } = useCart();

  const isCart = cart.find((cart) => cart.id == id);

  return (
    <AnimatePresence>
      <motion.section
        key={productId}
        initial={{ opacity: 0, y: 50 }} // Estado inicial
        animate={{ opacity: 1, y: 0 }} // Estado final
        transition={{ duration: 0.5 }}
        className="px-14 py-10 "
      >
        <Link
          to="/shop"
          className="flex items-center gap-2 mb-10 text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm cursor-pointer">Back to shop</span>
        </Link>
        <article className="flex  h-full  bg-white p-8 shadow-lg rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-80 h-80 object-contain  self-start"
          />
          <div className="ml-16 max-w-xl flex flex-col justify-between ">
            <header>
              <Link
                to={`/product/${category}`}
                className="text-xs text-blue-500 hover:underline cursor-pointer uppercase tracking-wide"
              >
                {category}
              </Link>
              <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
                {title}
              </h2>

              <p className="flex items-center gap-2 text-[14px] text-yellow-500 mb-2">
                <Star
                  size="15px"
                  fill="rgb(234 179 8 / var(--tw-text-opacity))"
                  stroke="false"
                />
                {rating.rate}
                <span className="text-gray-600">
                  ({rating.count} valoraciones)
                </span>
              </p>

              <p className="text-gray-600 my-4 leading-relaxed">
                {description}
              </p>
              <span className="text-4xl font-bold text-gray-800">${price}</span>
            </header>
            <footer className="mt-6">
              {isCart ? (
                <button
                  onClick={() => {
                    removeFromCart(product);
                  }}
                  className="bg-gray-100 text-black border text-sm h-12 px-6 rounded font-semibold hover:bg-gray-200 transition duration-300 "
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="bg-gray-800 text-white text-sm h-12 px-6 rounded font-semibold hover:bg-gray-800/80 transition duration-300 "
                >
                  Add To Cart
                </button>
              )}
            </footer>
          </div>
        </article>
        <div className="flex">
          <section className="w-full mt-10">
            <h3 className="font-semibold my-10 text-2xl text-gray-700">
              Product reviews
            </h3>
            {/*  */}
            <div className="w-72  rounded-lg shadow-md p-5">
              <div className="flex items-center gap-4 py-5 ">
                <p className="text-blue-500 text-6xl font-extrabold">4.5</p>
                <div className="flex flex-col gap-1">
                  <span className="flex">
                    {new Array(5).fill(null).map(() => (
                      <Star size={18} className="text-gray-800" />
                    ))}
                  </span>
                  <span className="text-gray-600 text-sm">45 reviews</span>
                </div>
              </div>
              <ul className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <li key={rating} className="flex items-center gap-4">
                    <Progress
                      value={
                        rating === 5
                          ? 45
                          : rating === 4
                          ? 25
                          : rating === 3
                          ? 15
                          : rating === 2
                          ? 10
                          : 5
                      }
                      className="h-3 bg-gray-200 rounded-full"
                      indicatorColor="bg-blue-500"
                    />
                    <span className="flex items-center gap-1 text-gray-600">
                      {rating} <Star size={14} className="text-gray-800" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/*  */}
          </section>
          <section className="mt-10">
            <h3 className="font-semibold my-10 text-2xl text-gray-700">
              Related products
            </h3>
            <ul className="flex flex-col gap-8 ">
              {products
                .filter(
                  (product) =>
                    product.category === category && product.id !== productId
                )
                .sort((a, b) => b.rating.rate - a.rating.rate)
                .slice(0, 5)
                .map((product) => (
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
          </section>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
export default ProductView;
