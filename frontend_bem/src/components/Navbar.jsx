import { useState, useEffect, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import { isAdminLoggedIn } from "../utils/auth.js";
import { FaUserCircle} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navbarLinks = isAdmin ? 
  ["Home", "Projects", "Experience", "Contact", "Tracker"]:
  ["Home", "Projects", "Experience", "Contact"];

  const handleLogout = (isAdmin) => {
    setIsModalOpen(false);

    if (isAdmin) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      setIsAdmin(false);
      navigate("/home");
    }
    else {
      navigate("/login");
    }
  }

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openAccountModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <nav className="relative w-full max-w-full overflow-x-clip bg-gray-800 lg:bg-transparent nav-color">
      <div className="flex w-full max-w-full items-center justify-between px-4 py-3 lg:bg-transparent lg:dark:bg-transparent dark:text-brand-dark_txt bg-brand-dark_bg dark:bg-brand-light_bg">
        {/* Logo */}
        <div className="text-3xl font-bold hover:text-gray-300 text-brand-light_txt dark:text-brand-dark_txt lg:text-brand-dark_txt lg:dark:text-brand-light_txt">
          <Link to="/">Bemenet's Portfolio</Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6">
          {navbarLinks.map(
            (item, index) => (
              <li
                key={index}
                className="relative group my-auto dark:text-brand-light_txt"
              >
                <Link
                  to={`${item.toLowerCase().replace(" ", "-")}`}
                  className="lis font-medium cursor-pointer text-brand-dark_txt dark:text-brand-light_txt"
                >
                  {item}
                  {/* Bottom Border Animation */}
                  <span
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-400 transform scale-x-0 
                           group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  ></span>
                </Link>
              </li>
            ),
          )}
          <li>
            <Button className="out-button px-4" onClick={openAccountModal}>
              {isAdmin ? (
                <div className="flex items-center justify-center">
                  Admin
                  <FaUserCircle className="inline h-5 ml-2 my-auto" />
                </div>
              ) : (
                "Log-in"
              )}
            </Button>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button className="focus:outline-none" onClick={toggleMenu}>
            <span
              className={`material-icons text-3xl text-brand-light_txt dark:text-brand-dark_txt transition-all duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute overflow-y-auto left-0 rounded-bl-2xl rounded-br-2xl w-full bg-brand-dark_bg dark:text-brand-dark_txt dark:bg-brand-light_bg transition-all duration-300 ease-in-out z-10 transform ${
          isOpen
            ? "opacity-100 translate-y-0 visible scale-100"
            : "opacity-0 -translate-y-2 invisible scale-100"
        }`}
      >
        <ul
          className={`flex flex-col items-center  space-y-4 py-4 rounded-b-xl bg-brand-dark_bg dark:bg-brand-light_bg`}
        >
          {navbarLinks.map(
            (item, index) => (
              <li
                key={index}
                className={`transform transition-all my-auto duration-500 nav-item-${index + 1} ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <Link
                  to={`${item.toLowerCase().replace(" ", "-")}`}
                  className="lis hover:scale-100 transition-transform duration-200 text-brand-light_txt dark:text-brand-dark_txt"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ),
          )}
          <li>
            <Button
              className="out-button-inverted px-4 mt-4 py-1"
              onClick={openAccountModal}
            >
              {isAdmin ? (
                <div className="flex items-center justify-center">
                  Admin
                  <FaUserCircle className="inline h-5 ml-2 my-auto" />
                </div>
              ) : (
                "Log-in"
              )}
            </Button>
          </li>
          <li
            className={`lis ml-auto mr-4 transform transition-all nav-item-6 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <ThemeToggle inline />
          </li>
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-brand-border_dark dark:border-brand-border_light bg-brand-light_bg dark:bg-brand-dark_bg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-brand-dark_txt dark:text-brand-light_txt">
              {isAdmin ? "Admin Dashboard" : "Log In"}
            </h2>
            {/* Placeholder content */}
            <p className="text-center text-brand-border_light dark:text-brand-border_dark">
              {isAdmin ? (
                <div>
                  Welcome to the admin dashboard! Here you can manage your
                  portfolio content.
                </div>
              ) : (
                <div>
                  Please log in to access the admin dashboard and manage your
                  portfolio.
                </div>
              )}
            </p>
            <div className="flex">
              <Button
                className="out-button mx-2 mt-4 w-full"
                onClick={() => handleLogout(isAdmin)}
              >
                {isAdmin ? <span>Log-out</span> : <span>Log-in</span>}
              </Button>
              <Button
                className="out-button mx-2 mt-4 w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
