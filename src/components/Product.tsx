import { useCart } from "@/context/cart.context";
import { Product } from "@/models/product.model";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  cart: boolean;
  size: "md" | "lg";
  rating: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  image,
  title,
  category,
  price,
  cart: $cart,
  size,
  rating,
}) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((cart) => cart.id === id);

  const handleAddToCart = () => {
    const product: Partial<Product> = {
      id,
      image,
      title,
      category,
      price,
    };
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart({ id });
  };

  return (
    <li
      className=" w-full h-full hover:scale-105 group transition-all 
    duration-300  border-gray-200 rounded-lg overflow-hidden shadow-black/30 shadow   "
    >
      <Link to={`/product/${id}`}>
        <img
          src={image}
          className={`w-full ${
            size === "lg" ? "h-52" : "h-40"
          }  object-contain p-5  duration-300 group-hover:p-1   bg-white `}
          alt={title}
        />
        <div className="rounded-b-lg text-sm font-medium text-gray-800    px-2 py-1 flex flex-col gap-2">
          <Link
            to="product/category"
            className="text-[13px] mx-auto w-fit text-blue-500 hover:underline cursor-pointer"
          >
            {category}
          </Link>
          <p className="mb-2 text-[14px] text-center max-w-80 w-full line-clamp-2 min-h-[40px]">
            {title}
          </p>

          <div className="flex justify-between  items-center mt-auto ">
            <p className="flex items-center gap-1 text-[14px]  ">
              <Star
                size="15px"
                fill="rgb(234 179 8 / var(--tw-text-opacity)"
                stroke="false"
              />
              {rating}
            </p>
            <p className=" text-lg font-bold text-gray-900 tracking-wider">
              ${price}
            </p>
            {$cart &&
              (isInCart ? (
                <button
                  onClick={handleRemoveFromCart}
                  className="relative border px-5 py-1 rounded bg-green-400 hover:bg-green-500 transition-all active:scale-105 "
                  title="Remove from cart"
                >
                  <ShoppingCart />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="border px-5 py-1 rounded hover:bg-green-400 active:scale-105 transition-all"
                  title="Add to cart"
                >
                  <ShoppingCart />
                </button>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Product;
