import Navbar from "./Navbar";
import { useState } from "react";

const FullNavbar = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <div className="">
      <nav className="flex justify-start drop-shadow-lg bg-titlebackground sticky top-0">
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
