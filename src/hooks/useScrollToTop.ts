import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (scrollPosition = 0) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [pathname, scrollPosition]);
};

export default useScrollToTop;
