import { useCart } from "@/context/cart.context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Star, Trash, X } from "lucide-react";

interface CartModalProps {
  sheetOpen: boolean;
  closeSheet: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ sheetOpen, closeSheet }) => {
  const { cart, removeFromCart } = useCart();
  console.log(cart);
  return (
    <Sheet open={sheetOpen} onOpenChange={closeSheet}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="">
            <h1 className="text-center">
              <strong>{cart.length}</strong> Productos en el carrito
            </h1>
          </SheetTitle>
        </SheetHeader>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10 overflow-y-auto h-full">
          {cart.map(({ id, image, title, category, price }) => (
            <li
              key={id}
              className=" w-full h-full   border-gray-200 rounded-lg overflow-hidden    "
            >
              <img
                src={image}
                className="w-full bg-gray-100 h-40 object-contain p-5 hover:p-1 hover:cursor-pointer"
                alt={title}
              />
              <div className="rounded-b-lg text-sm font-medium text-gray-800   bg-gray-100 px-2 py-1 flex flex-col gap-2">
                <p className="text-[14px] max-w-80 w-full line-clamp-2 min-h-[40px]">
                  {title}
                </p>

                <div className="flex justify-between items-center mt-auto ">
                  <p className=" text-lg font-bold text-gray-900 tracking-wider">
                    ${price}
                  </p>

                  <button
                    onClick={() => removeFromCart({ id })}
                    className="relative border px-5 py-1 rounded bg-red-400 hover:bg-red-500 transition-all active:scale-105 "
                    title="Remove from cart"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <SheetFooter className="absolute bottom-0 left-0 right-0 h-24 m-0 ">
          <button className="bg-gray-900 text-white mx-auto w-full hover:bg-gray-950">
            Limpiar carrito{" "}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CartModal;
