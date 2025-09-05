import { NavLink } from "react-router-dom"; // importe le navlink pour la redirection
import { variants } from "../../constants"; // importe un objet contenant les différents styles de boutons

export default function Button({ colorVariant, text, to, type, ...props }) {
  // ↑ component avec destructuration des props

  // si 'to' est fournis, on rend un navlink, sinon un bouton
  if (to) {
    return (
      <NavLink to={to} className={`${variants[colorVariant]}`} {...props}>
        {text}
      </NavLink>
    );
  } else {
    return (
      <button type={type} className={`${variants[colorVariant]}`} {...props}>
        {text}
      </button>
    );
  }
}
