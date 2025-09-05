const BASE_URL = import.meta.env.VITE_SERVER_URL; // import de l'url centralisé pour faciliter les changements d'environnement

export async function signUp(values) {
  // ↑ function pour l'inscription
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      // ↑ appel vers l'endpoint d'inscription
      method: "POST", // metohde POST pour créer un nouveau user
      body: JSON.stringify(values), // convertit l'obj js en json
      headers: {
        "Content-Type": "application/json", // indique au serveur que le contenu envoyé est en js
      },
    });
    const newUserMessage = await response.json(); // converit la reponse serveur json en obj js
    return newUserMessage; //retourne la rép pour l'utiliser ailleurs
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(values) {
  // ↑ function pour la connection
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
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
