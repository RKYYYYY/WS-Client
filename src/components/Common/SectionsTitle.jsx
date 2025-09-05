import Icon from "./Icon"; // importe le component Icon

export default function SectionTitle({ placeholder, icon = "placeholder" }) {
  // ↑ component pour afficher un titre de section avec icon
  return (
    <>
      <div className="bg-secondary-900 border box-border border-secondary-800 flex flex-row items-center px-[10px] py-[10px] rounded-2xl m-[16px]">
        {/* ↑ container principal */}
        <div className="bg-primary-500/25 min-w-[32px] min-h-[32px] rounded-[12px] flex justify-center items-center mr-[10px]">
          {/* ↑ container icon */}
          <Icon name={icon} className="text-primary-400" />
        </div>
        <h2 className="text-primary-400 font-schibsted-grotesk font-bold text-lg">
          {placeholder}
        </h2>
        {/* ↑ titre */}
      </div>
    </>
  );
}
