import { useRouteError } from "react-router-dom";
import Button from "../components/Common/Button";
import Icon from "../components/Common/Icon";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-900 px-4">
      <div className="max-w-md w-full text-center">
        {/* icon */}
        <div className="bg-red-500/25 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon name="cross" size={48} className="text-red-400" />
        </div>

        {/* code error */}
        <h1 className="text-red-400 font-schibsted-grotesk font-extrabold text-6xl sm:text-7xl mb-4">
          {error.status || "Error"}
        </h1>

        {/* message error */}
        <h2 className="text-secondary-100 font-schibsted-grotesk font-bold text-2xl sm:text-3xl mb-3">
          {error.statusText || "Something went wrong"}
        </h2>

        {error.data && (
          <p className="text-secondary-400 text-base sm:text-lg mb-8">
            {error.data}
          </p>
        )}

        {/* buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <Button
            colorVariant="btnPrimaryYellow"
            text="Return to homepage"
            to="/"
          />
          <button
            onClick={() => window.history.back()}
            className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors duration-300 ease-custom"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
