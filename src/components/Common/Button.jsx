import { NavLink } from "react-router-dom";
import { variants } from "../../constants";

export default function Button({
  colorVariant,
  text,
  to,
  type,
  className = "",
  onClick,
  ...props
}) {
  // Fusionne variant + classname
  const combinedClassName = `${variants[colorVariant]} ${className}`;

  // si 'to' est fournis, on rend un navlink, sinon un bouton
  if (to) {
    return (
      <NavLink
        to={to}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {text}
      </NavLink>
    );
  } else {
    return (
      <button
        type={type}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {text}
      </button>
    );
  }
}
