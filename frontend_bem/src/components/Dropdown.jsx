import React, { useState } from "react";

const Dropdown = ({ options, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options;

  const handleSelect = (option) => {
    onSelect(option);
    setSearchTerm(option);
    setShowOptions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      console.log("Escape key pressed");
      setShowOptions(false);
    }
  };

  return (
    <div className="flex-auto w-full mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          readOnly
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 100)}
          onMouseDown={(e) => {
            e.preventDefault();
            setShowOptions((prev) => !prev);
          }}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-mac_minimize/60 dark:border-brand-border_light dark:bg-transparent dark:text-white"
          placeholder={placeholder}
        />
        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
              showOptions ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {showOptions && (
          <ul className="absolute z-10 w-full rounded-xl bg-white dark:bg-brand-dark_bg shadow-lg max-h-56 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:bg-brand-mac_maximize dark:hover:bg-brand-mac_minimize dark:hover:text-brand-dark_txt cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
