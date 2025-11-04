import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../../components/Common/Icon";
import Button from "../Common/Button";

export default function Header() {
  const { userConnected, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="bg-secondary-900 shadow-md p-4 relative z-50">
      <div className="flex flex-row justify-between items-center">
        {/* Logo gauche */}
        <NavLink to="/" onClick={closeMenu} className="relative z-[60]">
          <div className="flex flex-row gap-2 items-center">
            <Icon name="logo" size={32} className="text-primary-400" />
            <span className="text-2xl font-bold text-secondary-50 hidden sm:inline">
              WrongSettings
            </span>
          </div>
        </NavLink>

        {/* Nav centré */}
        <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/discover"
            className="text-secondary-100 hover:text-secondary-200 font-semibold transition-colors text-lg"
          >
            Discover
          </NavLink>
        </nav>

        {/* Navi cachée sur mobile/tablette */}
        <nav className="hidden lg:flex items-center space-x-6">
          {userConnected ? (
            <>
              <NavLink
                to="/profile"
                className="text-secondary-100 hover:text-secondary-200 font-semibold transition-colors"
              >
                My profile
              </NavLink>
              <NavLink
                to="/profile-settings"
                className="text-secondary-100 hover:text-secondary-200 font-semibold transition-colors"
              >
                Profile Settings
              </NavLink>
              <NavLink
                to="/saved"
                className="text-secondary-100 hover:text-secondary-200 font-semibold transition-colors"
              >
                Saved Settings
              </NavLink>
              <Button
                colorVariant="btnPrimaryRed"
                text="Déconnexion"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <Button
                colorVariant="btnSecondaryYellow"
                text="Connexion"
                to="/login"
              />
              <Button
                colorVariant="btnPrimaryYellow"
                text="Inscription"
                to="/register"
              />
            </>
          )}
        </nav>

        {/* Bouton menu burger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 relative z-[60]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-secondary-100 transition-all duration-300 ease-custom ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-secondary-100 transition-all duration-300 ease-custom ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-secondary-100 transition-all duration-300 ease-custom ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Pour fermer le panneau en cliquant dehors */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Menu mobile/tablette */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-secondary-800 shadow-2xl transition-transform duration-300 ease-custom z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 pt-20 space-y-4">
          {userConnected ? (
            <>
              <NavLink
                to="/discover"
                onClick={closeMenu}
                className="text-secondary-100 hover:text-secondary-200 font-semibold text-lg transition-colors py-2 border-b border-secondary-700"
              >
                Discover
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeMenu}
                className="text-secondary-100 hover:text-secondary-200 font-semibold text-lg transition-colors py-2 border-b border-secondary-700"
              >
                My profile
              </NavLink>
              <NavLink
                to="/profile-settings"
                onClick={closeMenu}
                className="text-secondary-100 hover:text-secondary-200 font-semibold text-lg transition-colors py-2 border-b border-secondary-700"
              >
                Profile Settings
              </NavLink>
              <NavLink
                to="/saved"
                onClick={closeMenu}
                className="text-secondary-100 hover:text-secondary-200 font-semibold text-lg transition-colors py-2 border-b border-secondary-700"
              >
                Saved Settings
              </NavLink>
              <div className="pt-4">
                <Button
                  colorVariant="btnPrimaryRed"
                  text="Déconnexion"
                  onClick={handleLogout}
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/discover"
                onClick={closeMenu}
                className="text-secondary-100 hover:secondary-200 font-semibold text-lg transition-colors py-2 border-b border-secondary-700"
              >
                Discover
              </NavLink>
              <div className="pt-4 space-y-3">
                <Button
                  colorVariant="btnSecondaryYellow"
                  text="Connexion"
                  to="/login"
                  onClick={closeMenu}
                  className="w-full"
                />
                <Button
                  colorVariant="btnPrimaryYellow"
                  text="Inscription"
                  to="/register"
                  onClick={closeMenu}
                  className="w-full"
                />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
