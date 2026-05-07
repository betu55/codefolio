import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-transparent text-gray-400 text-center py-8">
      <p>
        <span>&copy;</span> {currentYear} Bemenet. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
