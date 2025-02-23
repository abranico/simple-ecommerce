import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <div className="max-w-screen-2xl  mx-auto flex flex-col min-h-screen ">
      <Navbar />
      <div className="grow pb-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
