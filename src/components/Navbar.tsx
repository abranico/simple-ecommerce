import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Package2, ShoppingCartIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IS_DEMO } from "@/config";
import { useAuth } from "@/context/auth.context";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useCart } from "@/context/cart.context";
import CartModal from "./CartModal";
const Navbar = () => {
  const { isLoggin } = useAuth();

  return (
    <div className="sticky top-0 bg-background z-10 scroll-m-10 flex w-full flex-col   shadow-black/70">
      {!IS_DEMO && (
        <p className="bg-gray-700 text-center py-1 ">
          Esta es una versión de demostración de la aplicación. Algunos datos y
          funcionalidades pueden estar limitados.
        </p>
      )}
      <header className="py-5 px-4 max-w-screen-lg mx-auto w-full ">
        <nav className="flex items-center justify-between  w-full">
          <ul className="w-full">
            <li>
              <NavLink
                to="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="-tracking-widest font-serif text-2xl ">
                  ecommerce
                </span>
              </NavLink>
            </li>
          </ul>
          <ul className="w-full  justify-center gap-6 hidden  flex-col  text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <li>
              <NavLink
                to="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/shop"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/featured"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Featured
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recommended"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Recommended
              </NavLink>
            </li>
          </ul>
          <ul></ul>
          <ul className="flex gap-2 items-center w-full ">
            <li className="hidden lg:block relative ml-28 p-2 cursor-pointer hover:opacity-55">
              <Cart />
            </li>
            <li className="hidden sm:flex ml-auto">
              <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {isLoggin ? <UserMenu /> : <NotUserMenu />}
              </div>
            </li>
            <li className="lg:hidden">
              <ResponsiveMenu isLoggin={isLoggin} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

const ResponsiveMenu = ({ isLoggin }: { isLoggin: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="grid gap-6 text-lg font-medium">
          <NavLink
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="-tracking-widest font-serif ">ecommerce</span>
          </NavLink>

          <div className=" flex justify-center shadow-sm items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {isLoggin ? <UserMenu /> : <NotUserMenu />}
          </div>

          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Shop
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Featured
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Recommended
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const UserMenu = () => {
  const { handleLogout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotUserMenu = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <>
      <LoginModal
        sheetOpen={sheetOpen}
        closeSheet={() => setSheetOpen(false)}
      />
      <Button onClick={() => setSheetOpen(true)} variant="outline">
        Sign In
      </Button>
    </>
  );
};

const Cart = () => {
  const { cart } = useCart();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <>
      <CartModal sheetOpen={sheetOpen} closeSheet={() => setSheetOpen(false)} />
      <button onClick={() => setSheetOpen(true)} className="m-0 p-0 w-0">
        <ShoppingCartIcon />
        <span className="absolute top-0 pl-7 z-20 font-bold text-gray-300">
          {cart.length > 99 ? "99+" : cart.length}
        </span>
      </button>
    </>
  );
};

export default Navbar;
