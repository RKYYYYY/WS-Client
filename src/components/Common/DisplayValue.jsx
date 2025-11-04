// afficher une valeur en lecture
export default function DisplayValue({
  title,
  value,
  unit = "",
  emptyText = "-",
}) {
  // gerer les cas null, undefined, 0, ""
  const displayValue = () => {
    // si value = null : undefined ou chaine vide
    if (value === null || value === undefined || value === "") {
      return emptyText; // "-" par défaut
    }

    // si value = 0 (valeur valide)
    if (value === 0) {
      return `0${unit}`;
    }

    // sinon afficher la value avec l'unité
    return `${value}${unit}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h5 className="text-secondary-200 font-bold text-lg">{title}</h5>
      <p className="text-secondary-100 text-base lg:text-lg">
        {displayValue()}
      </p>
    </div>
  );
}
