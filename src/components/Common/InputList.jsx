import { useState } from "react";

export default function SelectInputComponent({
  title = "Select an option",
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  helperText,
}) {
  const [localValue, setLocalValue] = useState(value ?? "");

  const handleChange = (e) => {
    const newValue = e.target.value;

    // convertir en number si la valeur est nombre
    const parsedValue =
      !isNaN(newValue) && newValue !== "" ? Number(newValue) : newValue;

    setLocalValue(parsedValue);

    if (onChange) {
      onChange(parsedValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h5 className="text-secondary-200 font-bold text-base sm:text-lg text-center">
        {title}
      </h5>

      <select
        value={localValue}
        onChange={handleChange}
        className="max-w-60 w-full border border-secondary-700 bg-secondary-800 rounded-xl px-3 py-2.5 text-secondary-200 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "object" ? option.value : option}
          >
            {typeof option === "object" ? option.label : option}
          </option>
        ))}
      </select>
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
