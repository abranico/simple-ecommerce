import { useCart } from "@/context/cart.context";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Link } from "react-router-dom";

interface CartModalProps {
  sheetOpen: boolean;
  closeSheet: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ sheetOpen, closeSheet }) => {
  const { cart, remove, increment, decrement, clear } = useCart();
  const total = cart
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);
  return (
    <Sheet open={sheetOpen} onOpenChange={closeSheet}>
      <SheetContent side="right" className="flex flex-col min-w-[50%] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 ">
            <ShoppingCart /> Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto md:px-4 py-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-10 w-full  object-cover rounded  "
                  />
                  <div className="flex-1">
                    <Link
                      to={`product/${item.id}`}
                      className="text-gray-800 hover:text-cyan-800 font-medium"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="p-1 hover:bg-gray-100 rounded ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter>
          <div className="border-t md:px-4 py-4 space-y-4 w-full">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  /* Implement checkout logic */
                }}
                className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                disabled={cart.length === 0}
              >
                Checkout
              </button>
              <button
                onClick={clear}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={cart.length === 0}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CartModal;
