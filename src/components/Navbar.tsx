import { Button } from "@/components/ui/button";
import {
  CircleUser,
  Menu,
  Package2,
  ShoppingBag,
  ShoppingCartIcon,
  User,
} from "lucide-react";
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
import SearchInput from "./SearchInput";
const Navbar = () => {
  const { isLoggin, isAdmin } = useAuth();

  return (
    <div className=" flex w-full flex-col    ">
      {!IS_DEMO && (
        <p className="bg-gray-700 text-center py-1 ">
          Esta es una versión de demostración de la aplicación. Algunos datos y
          funcionalidades pueden estar limitados.
        </p>
      )}
      <header className="bg-gray-50 w-full ">
        <nav className="px-4 md:px-14 py-5 flex items-center justify-between  w-full border-b border-gray-300">
          <ul className="">
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <span className="hidden md:block -tracking-widest font-serif text-2xl uppercase ">
                  ecommerce
                </span>
                <span className="md:hidden block -tracking-widest font-serif text-xl uppercase ">
                  ecommerce
                </span>
              </NavLink>
            </li>
          </ul>
          {/* <ul className="w-full  justify-center gap-6 hidden  flex-col  text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
          </ul> */}

          <ul className="hidden sm:block w-1/2">
            <SearchInput />
          </ul>

          <ul className="flex items-center gap-6 ">
            <li className="hidden md:flex ">
              <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {isLoggin ? <UserMenu /> : <NotUserMenu />}
              </div>
            </li>
            <li className=" h-[24px] cursor-pointer hover:opacity-55 ">
              <Cart />
            </li>
            <li className="lg:hidden">
              <ResponsiveMenu isLoggin={isLoggin} />
            </li>
          </ul>
        </nav>
        <nav className="hidden md:flex   text-white px-14 py-3  justify-between  ">
          <ul className="gap-6 flex text-lg font-medium  md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium mt-10 max-w-[250px]">
          <div className=" w-full flex justify-center  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {isLoggin ? <UserMenu /> : <NotUserMenu />}
          </div>
          <div className="w-full flex justify-center  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {<SearchInput />}
          </div>

          <NavLink
            to="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="text-muted-foreground hover:text-foreground"
          >
            Shop
          </NavLink>
          <NavLink
            to="/featured"
            className="text-muted-foreground hover:text-foreground"
          >
            Featured
          </NavLink>
          <NavLink
            to="/recommended"
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
        <button className="flex items-center gap-1">
          <CircleUser className="text-black" size="24" />
          <span>Mi cuenta</span>
          <span className="sr-only">Toggle user menu</span>
        </button>
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
      <Button
        onClick={() => setSheetOpen(true)}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <User size={20} />
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
      <button
        onClick={() => setSheetOpen(true)}
        className="flex gap-1 relative"
      >
        <ShoppingCartIcon size="24" />
        <span className="bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] absolute bottom-[15px] left-[15px]">
          {cart.length > 99 ? "99+" : cart.length}
        </span>
      </button>
    </>
  );
};

export default Navbar;
