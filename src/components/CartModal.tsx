import { Sheet, SheetContent } from "./ui/sheet";

interface CartModalProps {
  sheetOpen: boolean;
  closeSheet: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ sheetOpen, closeSheet }) => {
  return (
    <Sheet open={sheetOpen} onOpenChange={closeSheet}>
      <SheetContent side="bottom" className="h-[50vh]">
        <h1>hola</h1>
      </SheetContent>
    </Sheet>
  );
};
export default CartModal;
