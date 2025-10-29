export default function HomeCard({
  placeholder,
  imageSrc,
  imageAlt,
  ...props
}) {
  // ↑ componant des cards de la homepage
  return (
    <div className="bg-linear-to-tr from-secondary-800 from-50% to-secondary-700 border border-secondary-700 rounded-2xl relative overflow-hidden min-h-70 px-2.5 pt-2.5">
      <h3 className="text-lg font-semibold text-secondary-100 mb-3">
        {placeholder}
      </h3>
      <img
        src={imageSrc}
        alt={imageAlt}
        className=" h-auto w-full absolute px-12"
        {...props}
      />
    </div>
  );
}
