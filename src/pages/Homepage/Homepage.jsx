import Button from "../../components/Common/Button";
import HomeCard from "../../components/Common/HomeCard";
import SavedImg from "../../assets/images/Saved.webp";
import ProfileImg from "../../assets/images/Profile.webp";
import SetupImg from "../../assets/images/Setup.webp";

export default function Homepage() {
  return (
    <div className="flex flex-col mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40">
      <div className="mb-20 mt-16 sm:mt-20 md:mt-24">
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-20 mt-20 text-center leading-tight">
          You are <span className="text-red-400">bad</span> ? You want to be
          <span className="text-green-400"> successful</span> in your Counter
          Strike games ?
        </h1>
        <div className="mb-3">
          <h2 className="font-schibsted-grotesk text-secondary-100 font-bold text-xl sm:text-2xl lg:text-3xl mb-4 text-center">
            With WrongSettings, you will finally know if your settings were the
            problem or if it's was you the whole time !
          </h2>
          <div className="flex justify-center mt-10 sm:mt-15">
            <Button
              colorVariant="btnPrimaryYellow"
              text="Try it now !"
              to="/register"
              className="px-10"
            />
          </div>
        </div>
      </div>
      <div className="mb-20">
        <h2 className="font-schibsted-grotesk text-secondary-100 font-bold text-xl sm:text-2xl lg:text-3xl mb-3">
          Why WrongSettings is useful ?
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
          <HomeCard
            placeholder="Find the best configuration among the community."
            src={SavedImg}
            alt="Screenshot showing saved settings page"
          />
          <HomeCard
            placeholder="Share your settings and save the one you like to remember it."
            src={ProfileImg}
            alt="Screenshot showing profile page"
          />
          <HomeCard
            placeholder="Fast and easy to setup in game with the console. "
            src={SetupImg}
            alt="Screenshot showing ..."
          />
        </div>
      </div>
      <div>
        <h2 className="font-schibsted-grotesk text-secondary-100 font-bold text-xl sm:text-2xl lg:text-3xl mb-3">
          With all that choice, what are you waiting to become better ?
        </h2>
        {/* insérer carousel de profils aléatoires */}
        <div className="flex justify-center">
          <Button
            colorVariant="btnSecondaryYellow"
            text="Discover profiles"
            to="/discover"
          />
        </div>
      </div>
    </div>
  );
}
