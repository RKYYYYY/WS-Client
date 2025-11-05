import { useState, useEffect } from "react";
import ProfileCard from "../components/Common/ProfileCard";
import Icon from "../components/Common/Icon";
import InputList from "../components/Common/InputList";
import { getUsers } from "../api/auth.api";

export default function Discover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState(new Set());

  // Récupération des utilisateurs au chargement et lors des changements de filtres
  useEffect(() => {
    fetchUsers();
  }, [searchQuery, sortBy]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(searchQuery, sortBy);
      if (response.users) {
        setUsers(response.users);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value) => {
    // Mapper les valeurs affichées aux valeurs attendues par le backend
    const sortMapping = {
      "Most recent": "recent",
      "Most saved": "saved",
      "A - Z": "alphabetical",
    };
    setSortBy(sortMapping[value] || "recent");
  };

  const handleBookmark = (userId) => {
    setBookmarkedProfiles((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(userId)) {
        newBookmarks.delete(userId);
      } else {
        newBookmarks.add(userId);
      }
      return newBookmarks;
    });
  };

  return (
    <div className="flex flex-col mx-4 max-w-7xl w-full">
      {/* Titre de la section */}
      <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl mt-10 mb-10 text-center">
        Discover an infinity of profiles
      </h1>

      {/* Sous-titre */}
      <p className="text-secondary-100 text-center mb-8 mx-4">
        Choose among the most recent or the most saved profiles
      </p>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 mx-4">
        {/* Barre de recherche */}

        <input
          type="text"
          placeholder="Search profiles by username..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-secondary-800 border border-secondary-700 rounded-xl px-4 py-4 text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />

        {/* Filtre de tri */}
        <div className="sm:w-48">
          <InputList
            title=""
            options={["Most recent", "Most saved", "A - Z"]}
            value={
              sortBy === "recent"
                ? "Most recent"
                : sortBy === "saved"
                ? "Most saved"
                : "A - Z"
            }
            onChange={handleSortChange}
            placeholder="Sort by..."
          />
        </div>
      </div>

      {/* Grille des profils */}
      <div className="mx-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-secondary-400 text-lg">
              Loading profiles...
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <Icon
              name="placeholder"
              size={64}
              className="text-secondary-600 mb-4"
            />
            <p className="text-secondary-400 text-lg">No profiles found</p>
            <p className="text-secondary-500 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <ProfileCard
                key={user._id}
                user={user}
                onBookmark={handleBookmark}
                isBookmarked={bookmarkedProfiles.has(user._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Message de fin si il y a des résultats */}
      {!loading && users.length > 0 && (
        <div className="text-center py-8">
          <p className="text-secondary-400">
            Showing {users.length} profile{users.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
