import { useState } from "react";

export default function InputText({
  title = "titre",
  placeholder = "Enter option",
  value,
  onChange,
  helperText,
  type = "text", // "text" ou "number"
  min, // valeur minimum
  max, // valeur maximum
  step,
}) {
  const [localValue, setLocalValue] = useState(value ?? "");

  const handleChange = (e) => {
    let newValue = e.target.value;

    // si nombre et valeur pas vide : convertir en Number
    if (type === "number" && newValue !== "") {
      newValue = Number(newValue);
    }

    setLocalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h5 className="text-secondary-200 font-bold text-base sm:text-lg text-center">
        {title}
      </h5>
      <input
        type={type}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="max-w-60 w-full border border-secondary-700 bg-secondary-800 rounded-xl px-3 py-2 text-secondary-200 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
      <div className="h-5 max-w-60 w-full">
        {helperText && (
          <p className="text-secondary-400 text-sm font-semibold">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
