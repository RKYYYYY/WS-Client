import { createContext, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signOut } from "../api/auth.api";

const AuthContext = createContext(); // contexte react pour partager l'état d'authentification

export function AuthProvider({ children }) {
  //  composant provider qui wrap le site pour fournir le context à tous les composants enfants
  const initialUser = useLoaderData();
  const [userConnected, setUserConnected] = useState(initialUser); // stocke les infos de l'utilisateur connecté

  console.log(userConnected);
  const login = async (values) => {
    setUserConnected(values); // function pour connecter un user
  };

  const logout = async () => {
    await signOut();
    setUserConnected(null); // function pour déco le user
  };

  return (
    <AuthContext.Provider
      value={{
        userConnected,
        login,
        logout,
      }} //fournit ces valeur à tous les composants enfants
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // hook pour utiliser facilement le contexte
}
