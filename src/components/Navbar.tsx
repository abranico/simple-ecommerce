import { Button } from "@/components/ui/button";
import { CircleUser, Menu, ShoppingCartIcon, User } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

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
import { useCart } from "@/context/cart.context";
import clsx from "clsx";
import { useState } from "react";
import CartModal from "./CartModal";
import LoginModal from "./LoginModal";
import SearchInput from "./SearchInput";
const Navbar = () => {
  const { isLoggin } = useAuth();

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
                className={({ isActive }) =>
                  clsx(
                    "transition-colors hover:text-foreground",
                    isActive ? "text-black font-bold" : "text-muted-foreground"
                  )
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors hover:text-foreground",
                    isActive ? "text-black font-bold" : "text-muted-foreground"
                  )
                }
              >
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/featured"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors hover:text-foreground",
                    isActive ? "text-black font-bold" : "text-muted-foreground"
                  )
                }
              >
                Featured
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/recommended"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors hover:text-foreground",
                    isActive ? "text-black font-bold" : "text-muted-foreground"
                  )
                }
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
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener la ruta activa actual

  const handleNavigation = (path: string) => {
    navigate(path); // Esto cambia la ruta
  };

  const isActive = (path: string) => location.pathname === path;
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
          <div className="w-full sm:hidden flex justify-center  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {<SearchInput />}
          </div>

          <SheetTrigger asChild>
            <NavLink
              to="/"
              onClick={() => handleNavigation("/")}
              className={`transition-colors hover:text-foreground ${
                isActive("/") ? "text-black font-bold" : "text-muted-foreground"
              }`}
            >
              Home
            </NavLink>
          </SheetTrigger>
          <SheetTrigger asChild>
            <NavLink
              to="/shop"
              onClick={() => handleNavigation("/shop")}
              className={`transition-colors hover:text-foreground ${
                isActive("/shop")
                  ? "text-black font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Shop
            </NavLink>
          </SheetTrigger>
          <SheetTrigger asChild>
            <NavLink
              to="/featured"
              onClick={() => handleNavigation("/featured")}
              className={`transition-colors hover:text-foreground ${
                isActive("/featured")
                  ? "text-black font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Featured
            </NavLink>
          </SheetTrigger>
          <SheetTrigger asChild>
            <NavLink
              to="/recommended"
              onClick={() => handleNavigation("/recommended")}
              className={`transition-colors hover:text-foreground ${
                isActive("/recommended")
                  ? "text-black font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Recommended
            </NavLink>
          </SheetTrigger>
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
