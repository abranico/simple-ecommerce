import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import React, { useId, useState } from "react";

interface ILoginModal {
  sheetOpen: boolean;
  closeSheet: () => void;
}

const LoginModal: React.FC<ILoginModal> = ({ sheetOpen, closeSheet }) => {
  const { handleLogin } = useAuth();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
    closeSheet();
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={closeSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-3xl font-bold">Sign In</h1>
          </SheetTitle>
          <SheetDescription>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <form onSubmit={handleSubmit} className="grid gap-7">
              <div className="grid gap-2">
                <label htmlFor={emailId}>Email</label>
                <Input
                  id={emailId}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label htmlFor={passwordId}>Password</label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id={passwordId} type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LoginModal;
