import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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
