import Navbar from "./Navbar";
import { useState } from "react";

const FullNavbar = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <div className="">
      <nav className="flex justify-center drop-shadow-lg bg-titlebackground sticky top-0 max-md:justify-end">
        <Navbar
          className=""
          burgerOpen={burgerOpen}
          setBurgerOpen={setBurgerOpen}
        />
      </nav>
    </div>
  );
};

export default FullNavbar;
