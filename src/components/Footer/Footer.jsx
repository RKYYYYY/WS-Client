import { NavLink } from "react-router-dom";
import Icon from "../Common/Icon";
import { useAuth } from "../../context/AuthContext";

export default function Footer() {
  const { userConnected } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 border-t border-secondary-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section: Logo & Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Logo section */}
          <div className="flex flex-col gap-3">
            <NavLink to="/" className="flex items-center gap-2">
              <Icon name="logo" size={32} className="text-primary-400" />
              <span className="text-xl font-bold font-schibsted-grotesk text-secondary-100">
                WrongSettings
              </span>
            </NavLink>
            <p className="text-secondary-400 text-sm max-w-xs">
              Share your CS2 settings and discover the best configurations from
              the community.
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-secondary-200 font-semibold text-sm uppercase tracking-wider mb-1">
                Navigation
              </h3>
              <NavLink
                to="/"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                Home
              </NavLink>
              <NavLink
                to="/discover"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                Discover
              </NavLink>
              {userConnected && (
                <NavLink
                  to="/profile"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  My Profile
                </NavLink>
              )}
            </div>

            {userConnected && (
              <div className="flex flex-col gap-3">
                <h3 className="text-secondary-200 font-semibold text-sm uppercase tracking-wider mb-1">
                  Account
                </h3>
                <NavLink
                  to="/profile-settings"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Account Settings
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom section: Copyright & Legal */}
        <div className="pt-6 border-t border-secondary-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-secondary-500 text-sm text-center sm:text-left">
            © {currentYear} WrongSettings. All rights reserved.
          </p>
          <NavLink
            to="/legal-notice"
            className="text-secondary-500 hover:text-primary-400 transition-colors duration-300 text-sm"
          >
            Legal Notice
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
