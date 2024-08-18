import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Moon, Package2, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth.context";
import LoginModal from "./LoginModal";
import { useState } from "react";
import { IS_DEMO } from "@/config";
const Navbar = () => {
  const { isLoggin } = useAuth();

  return (
    <div className="flex  w-full flex-col">
      {IS_DEMO && (
        <p className="bg-gray-700 text-center py-1">
          Esta es una versión de demostración de la aplicación. Algunos datos y
          funcionalidades pueden estar limitados.
        </p>
      )}

      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavLink
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="-tracking-widest font-serif ">ecommerce</span>
          </NavLink>
          <NavLink
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Shop
          </NavLink>
          <NavLink
            to="/featured"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Featured
          </NavLink>
          <NavLink
            to="/recommended"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Recommended
          </NavLink>
        </nav>

        <ResponsiveMenu />

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          {isLoggin ? <UserMenu /> : <NotUserMenu />}
        </div>
      </header>
    </div>
  );
};

const ResponsiveMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <NavLink
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Orders
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Products
          </NavLink>
          <NavLink
            to="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Customers
          </NavLink>
          <NavLink to="#" className="hover:text-foreground">
            Settings
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

export default Navbar;
