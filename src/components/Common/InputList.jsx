import { useState } from "react";

export default function SelectInputComponent({
  title = "Choisir une option",
  options = [],
  value,
  onChange,
  placeholder = "Sélectionnez une option",
}) {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h5 className="text-secondary-200 font-bold text-lg">{title}</h5>

      <select
        value={localValue}
        onChange={handleChange}
        className="border border-secondary-700 bg-secondary-800 rounded-xl px-3 py-2.5 text-secondary-200 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "object" ? option.value : option}
          >
            {typeof option === "object" ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );
}
