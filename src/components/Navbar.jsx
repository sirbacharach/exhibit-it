import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const navlinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Cleveland Artworks",
    link: "/clartworks",
  },
  {
    title: "Repairs, MOT & Servicing",
    link: "/repairsservice",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = ({ burgerOpen, setBurgerOpen }) => {
  const handleMenu = () => {
    setBurgerOpen((prev) => !prev);
  };

  const BurgerOff = () => {
    setBurgerOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="flex items-center">
          {/* navlinks*/}
          <div className="hidden md:block">
            <div className="flex items-baseline">
              {navlinks.map((link, index) => (
                <Link
                  key={index}
                  className="text-white transition-all duration-500 hover:bg-navbuttpressed hover:text-white px-2 py-2 text-md font-medium"
                  to={link.link}
                >
                  <p>{link.title}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* hamburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex text-white hover:text-white hover:bg-navbuttpressed px-1 py-1.5"
            >
              <span className="sr-only px-3">Open Main Menu</span>
              {burgerOpen === true ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <div className="flex items-center">
                  <FaBars className="w-6 h-6" />
                  <p className="pl-2 pr-1 text-white text-lg font-medium">
                    Menu
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile-menu */}
      {burgerOpen ? (
        <div className="md:hidden">
          <div className="ox-2 pb-3 space-y-1 sm:px-3">
            {navlinks.map((link, index) => (
              <Link
                key={index}
                className="text-white hover:bg-navbuttpressed hover:text-white block px-3 py-2 text-base font-medium"
                to={link.link}
                onClick={BurgerOff}
              >
                <p>{link.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
