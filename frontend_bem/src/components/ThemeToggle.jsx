import { useEffect, useState } from "react";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = ({ inline = false }) => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const baseStyles =
    "border text-brand-mac_minimize_dark dark:text-yellow-400 dark:border-gray-600 rounded-full hover:scale-105 transition-transform duration-100";

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`${
        inline
          ? "w-9 h-9 flex items-center justify-center bg-transparent"
          : "hidden md:flex md:fixed md:bottom-6 md:right-6 md:z-50 w-12 h-12 items-center justify-center shadow-lg bg-brand-light dark:bg-brand-dark"
      } ${baseStyles}`}
      title="Toggle Theme"
    >
      {isDark ? (
        <BsSunFill size={inline ? 14 : 20} />
      ) : (
        <BsFillMoonFill size={inline ? 14 : 20} />
      )}
    </button>
  );
};

export default ThemeToggle;