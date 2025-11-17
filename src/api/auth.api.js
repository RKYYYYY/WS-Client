const BASE_URL = import.meta.env.VITE_SERVER_URL; // import de l'url centralisé pour faciliter les changements d'environnement

export async function signUp(values) {
  // function pour l'inscription
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      // appel vers l'endpoint d'inscription
      method: "POST", // metohde POST pour créer un nouveau user
      body: JSON.stringify(values), // convertit l'obj js en json
      headers: {
        "Content-Type": "application/json", // indique au serveur que le contenu envoyé est en js
      },
    });
    const newUserMessage = await response.json(); // convertit la reponse serveur json en obj js
    return newUserMessage; //retourne la rép pour l'utiliser ailleurs
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(values) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/user/current`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  await fetch(`${BASE_URL}/user/deleteToken`, {
    method: "DELETE",
    credentials: "include",
  });
}

export const updateUserProfile = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile-settings`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// récup game settings de l'utilisateur co
export const getGameSettings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/game-settings`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    } else {
      return { gameSettings: {} };
    }
  } catch (error) {
    console.log(error);
    return { gameSettings: {} };
  }
};

// update les game settings
export const updateGameSettings = async (gameSettings) => {
  try {
    const response = await fetch(`${BASE_URL}/user/game-settings`, {
      method: "PUT",
      body: JSON.stringify(gameSettings),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// récup les game settings d'autre utilisateur
export const getUserGameSettings = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/game-settings/${userId}`, {
      method: "GET",
    });

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// recup tous les utilisateur avec filtres pour page discover
export const getUsers = async (searchQuery = "", sortBy = "recent") => {
  try {
    // Construction de l'URL avec les paramètres de recherche
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortBy) params.append("sort", sortBy);

    const response = await fetch(`${BASE_URL}/user/all?${params.toString()}`, {
      method: "GET",
    });

    if (response.ok) {
      return await response.json();
    } else {
      return { users: [] };
    }
  } catch (error) {
    console.log(error);
    return { users: [] };
  }
};

// demande de réinitialisation de mot de passe
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/user/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// réinitialisation du mot de passe
export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
