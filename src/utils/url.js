// Détecte automatiquement l'environnement
const isDevelopment = import.meta.env.MODE === "development";

export const BASE_URL = isDevelopment
  ? "http://localhost:5000"
  : "https://wrongsettings.onrender.com";
