// import { useState } from "react";
import { Link } from "react-router-dom";

const Button = ({
  link,
  className,
  disabled = false,
  onClick,
  children,
  external = false,
  type = "button",
  ...props
}) => {
  if (link) {
    return (
      <Link to={link} target={external ? "_blank" : "_self"} className={className} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
