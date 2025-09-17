const BASE_URL = import.meta.env.VITE_SERVER_URL; // import de l'url centralisé pour faciliter les changements d'environnement

export async function getUsers(searchQuery = "", sortBy = "recent") {
  // ↑ function pour récupérer la liste des utilisateurs avec filtres pour la page discover
  try {
    const queryParams = new URLSearchParams({
      search: searchQuery,
      sort: sortBy,
    });

    const response = await fetch(`${BASE_URL}/discover?${queryParams}`, {
      method: "GET",
      credentials: "include", // inclut les cookies pour l'auth si nécessaire
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { users: [], message: "Error fetching users" };
  }
}

export async function bookmarkProfile(userId) {
  // ↑ function pour ajouter/retirer un profil des favoris
  try {
    const response = await fetch(`${BASE_URL}/discover/bookmark/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Error bookmarking profile" };
  }
}
