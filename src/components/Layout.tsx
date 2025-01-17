import useScrollToTop from "@/hooks/useScrollToTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col min-h-screen ">
      <Navbar />
      <div className="grow">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
