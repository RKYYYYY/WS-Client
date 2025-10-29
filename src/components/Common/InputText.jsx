import { useState } from "react";

export default function InputText({
  title = "titre",
  placeholder = "Enter option",
  value,
  onChange,
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
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="max-w-60 w-full  border border-secondary-700 bg-secondary-800 rounded-xl px-3 py-2 text-secondary-200 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
    </div>
  );
}
