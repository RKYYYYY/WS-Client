import { useState } from "react";
import Icon from "./Icon";
import toast from "react-hot-toast";

export default function CommandCopy({
  commands,
  isEditing = false,
  onCommandChange = null,
  placeholder = "Enter your command or code here",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(commands)
      .then(() => {
        setCopied(true);
        toast.success("Commands copied to clipboard !");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy commands");
      });
  };

  const handleChange = (e) => {
    if (isEditing && onCommandChange) {
      onCommandChange(e.target.value);
    }
  };

  const handlePaste = (e) => {
    if (isEditing && onCommandChange) {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const cleanedText = pastedText.trim().toUpperCase();
      onCommandChange(cleanedText);
    }
  };

  return (
    <div className="mb-6 p-4 bg-secondary-800 border border-secondary-700 rounded-xl">
      <h3 className="text-secondary-200 font-bold text-base mb-3">
        Console Commands
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={commands}
          readOnly={!isEditing}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={isEditing ? placeholder : ""}
          className={`flex-1 bg-secondary-900 border border-secondary-700 rounded-lg px-3 py-2 text-secondary-300 text-sm font-mono ${
            isEditing
              ? "cursor-text focus:outline-none focus:ring-2 focus:ring-primary-400"
              : "cursor-text select-all focus:outline-none"
          }`}
        />
        <button
          onClick={handleCopy}
          disabled={isEditing}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-custom flex items-center gap-2 ${
            isEditing
              ? "bg-secondary-700 text-secondary-500 cursor-not-allowed"
              : copied
              ? "bg-blue-500/25 text-blue-400"
              : "bg-blue-500/0 text-blue-400 hover:bg-blue-500/25 hover:text-blue-400"
          }`}
        >
          {copied ? (
            <>
              <Icon name="check" size={20} />
            </>
          ) : (
            <>
              <Icon name="fileCopy" size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
