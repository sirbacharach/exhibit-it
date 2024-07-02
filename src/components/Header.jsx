import { Link } from "react-router-dom";
import FullNavbar from "./FullNavbar";

function Header() {
  return (
    <div className="z-10 bg-titletextbackground text-shadow:_0_1px_0_var(--tw-shadow-color)] sticky top-0">
      <div className="flex items-center flex-wrap py-2 max-h-30 justify-center overflow-hidden">
        <Link to="/">
          <div className="">
            <h1 className="text-nowrap text-white font-extrabold text-8xl flex align-baseline font-headers max-md:text-6xl max-sm:text-5xl max-xs:text-4xl max-2xs:text-2xl max-md2:text-7xl">
              Exhibit-it
            </h1>
            <h2 className="text-center text-white font-bold font-headers max-md:text-6xl max-sm:text-5xl max-xs:text-4xl max-2xs:text-2xl max-md2:text-7xl">
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
