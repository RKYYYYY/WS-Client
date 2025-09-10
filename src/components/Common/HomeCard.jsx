import saved1 from "./saved-1.png";

export const Frame = () => {
  return (
    <div className="flex flex-col w-[380px] items-end relative">
      <div className="relative self-stretch w-full h-60 bg-secondarysecondary-800 rounded-2xl border border-solid border-secondarysecondary-700" />

      <div className="flex w-[380px] items-center justify-center gap-2.5 p-2.5 absolute top-0 left-0">
        <p className="">
          You can save your friends settings to try them easily.
        </p>
      </div>

      <img
        className="absolute w-[292px] h-[191px] top-[49px] left-8 aspect-[0.97] object-cover"
        alt=""
        src=""
      />
    </div>
  );
};
