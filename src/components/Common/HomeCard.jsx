export default function HomeCard({ placeholder, ...props }) {
  // ↑ componant des cards de la homepage
  return (
    <div className="bg-linear-to-tr from-secondary-800 from-50% to-secondary-700 border border-secondary-700 rounded-2xl relative overflow-hidden min-h-70 px-2.5 pt-2.5">
      <h3 className="text-lg text-secondary-100 mb-3">{placeholder}</h3>
      <img
        src="src/assets/images/Saved.png"
        alt="blblblbl"
        className=" h-auto w-full absolute px-12"
      />
    </div>
  );
}
