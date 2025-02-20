import ListOfProducts from "@/components/ListOfProducts";
import { useCart } from "@/context/cart.context";
import { useProducts } from "@/context/products";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProductView = () => {
  const { products } = useProducts();
  const { id } = useParams();
  const product = products.find(
    (product) => product.id === parseInt(id as string)
  );

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

  const relatedProducts = products
    .filter(
      (product) => product.category === category && product.id !== productId
    )
    .sort((a, b) => b.rating.rate - a.rating.rate);

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
                to="/shop"
                state={category}
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
        <section className="mt-10">
          <h3 className="font-semibold my-10 text-2xl text-gray-700">
            Related products
          </h3>
          <ListOfProducts products={relatedProducts} />
        </section>
      </motion.section>
    </AnimatePresence>
  );
};
export default ProductView;
