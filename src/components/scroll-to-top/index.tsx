import { useEffect } from "react";
import { Location } from "history";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation<Location>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
