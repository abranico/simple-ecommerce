import { useCart } from "@/context/cart.context";
import { Product } from "@/models/product.model";
import { ShoppingCart, Star } from "lucide-react";

interface ProductProps {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  rating: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  image,
  title,
  category,
  price,
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
    <li className=" w-full h-full   border-gray-200 rounded-lg overflow-hidden    ">
      <img
        src={image}
        className="w-full bg-white h-40 object-contain p-5 hover:p-1 hover:cursor-pointer"
        alt={title}
      />
      <div className="rounded-b-lg text-sm font-medium text-gray-800   bg-gray-100 px-2 py-1 flex flex-col gap-2">
        <p className="text-[13px] text-blue-500 hover:underline cursor-pointer">
          {category}
        </p>
        <p className="text-[14px] max-w-80 w-full line-clamp-2 min-h-[40px]">
          {title}
        </p>
        <p className="flex items-center gap-1 text-[14px]  ">
          <Star
            size="15px"
            fill="rgb(234 179 8 / var(--tw-text-opacity)"
            stroke="false"
          />
          {rating}
        </p>
        <div className="flex justify-between items-center mt-auto ">
          <p className=" text-lg font-bold text-gray-900 tracking-wider">
            ${price}
          </p>
          {isInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="relative border px-5 py-1 rounded bg-red-400 hover:bg-red-500 transition-all active:scale-105 "
              title="Remove from cart"
            >
              <ShoppingCart />
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="border px-5 py-1 rounded hover:bg-gray-400 active:scale-105 transition-all"
              title="Add to cart"
            >
              <ShoppingCart />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Product;
