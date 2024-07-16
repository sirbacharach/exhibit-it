import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullNavbar from "./FullNavbar";

function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`z-10 bg-titletextbackground text-shadow:_0_1px_0_var(--tw-shadow-color)] sticky top-0 rounded-xl transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center flex-wrap py-1 max-h-30 justify-center overflow-hidden">
        <Link to="/">
          <div className="">
            <h1 className="text-nowrap justify-center font-extrabold flex align-baseline font-headers text-8xl max-xs:text-6xl ">
              Exhib-it
            </h1>
            <h2 className="text-center font-bold font-headers text-lg  max-xs:text-sm max-2xs:text-sm">
              Exhibition Curator
            </h2>
          </div>
        </Link>
      </div>
      <FullNavbar />
    </div>
  );
}

export default Header;
