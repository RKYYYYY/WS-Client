import { NavLink } from "react-router-dom"; // component de react router pour la navigation
import { useAuth } from "../../context/AuthContext"; // hook pour accéder au contexte d'authentification
import Icon from "../../components/Common/Icon";

export default function Header() {
  const { userConnected, logout } = useAuth(); // destructure depuis le contexte : userConnected : boolean (true si connecté); logout : function pour déco l'user

  return (
    <header className="bg-secondary-900 shadow-md p-4 flex flex-row justify-between items-center min-w-screen">
      <NavLink to="/">
        <div className="flex flex-row gap-2">
          <Icon name="logo" size={32} className="text-primary-400" />
          <span className="text-2xl font-bold text-secondary-50">
            WrongSettings
          </span>
        </div>
      </NavLink>
      <nav className="flex space-x-6">
        {userConnected ? ( // si l'user est connecté ça affiche
          <>
            <NavLink
              to="/profile"
              className="text-secondary-100 hover:text-secondary-200 font-semibold"
            >
              My profile
            </NavLink>
            <NavLink
              to="/profile-settings"
              className="text-secondary-100 hover:text-secondary-200 font-semibold"
            >
              Profile Settings
            </NavLink>
            <NavLink
              to="/saved"
              className="text-secondary-100 hover:text-secondary-200 font-semibold"
            >
              Saved Settings
            </NavLink>
            <NavLink
              to="/login"
              onClick={logout}
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              Déconnexion
            </NavLink>
          </>
        ) : (
          // ↑ si l'user n'est pas connecté ça affiche
          <>
            <NavLink
              to="/login"
              className="text-secondary-100 hover:text-secondary-200 font-semibold"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/register"
              className="text-primary-400 hover:text-primary-500 font-semibold"
            >
              Inscription
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
