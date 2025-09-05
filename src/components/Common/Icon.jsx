import { useEffect, useState } from "react";

const GIST_BASE =
  "https://gist.githubusercontent.com/RKYYYYY/f20d4b228f31c7eb4662dae1f5a434dd/raw"; // url du github Gist qui contient les icon svg, permet de les récup dynamiquement
export default function Icon({ name, className }) {
  // ↑ component qui prendre 2 props
  const [svg, setSvg] = useState(""); // stock le contenu SVG récup

  useEffect(() => {
    fetch(`${GIST_BASE}/${name}.svg`) // dl le fichier svg depuis le gist
      .then((res) => res.text()) // convertit la rép en texte brut (code svg)
      .then(setSvg); // stocke le contenue svg dans le useState
  }, [name]);

  // injecter className dans la balise <svg>
  const svgWithClass = svg.replace(
    /<svg([^>]*)>/,
    `<svg$1 class="${className}">` // regex qui trouve la balise <svg> et y ajoute les classes css
  );

  return <span dangerouslySetInnerHTML={{ __html: svgWithClass }} />; // injecte le code svg direct dans le DOM (equivalent InnerHTML en react)
}
