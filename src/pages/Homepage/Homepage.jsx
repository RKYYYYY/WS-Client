import Button from "../../components/Common/Button";

export default function Homepage() {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl text">
          You're <span className="text-red-400">bad</span> ? You want to
          progress and be <span className="text-green-400">successful</span> in
          your Counter-Strike carrier ?
        </h1>
        <div>
          <h2 className="font-schibsted-grotesk text-secondary-100 font-bold text-xl">
            With WrongSettings, you will finally know if your settings were the
            problem or if it's was you the whole time !
          </h2>
          <Button
            colorVariant="btnPrimaryYellow"
            text="Try it now !"
            to="/register"
          />
        </div>
      </div>
      <div>
        <h2 className="font-schibsted-grotesk text-secondary-100 font-bold text-xl">
          Why WrongSettings is useful ?
        </h2>
      </div>
    </div>
  );
}
