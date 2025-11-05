import { useState, useEffect } from "react";
import ProfileCard from "../components/Common/ProfileCard";
import Icon from "../components/Common/Icon";
import { getUsers } from "../api/auth.api";

export default function Discover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Récupération des utilisateurs au chargement et lors des changements de filtres
  useEffect(() => {
    fetchUsers();
  }, [searchQuery, sortBy]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(searchQuery, sortBy);

      if (response && response.users) {
        setUsers(response.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value) => {
    // mapper les valeurs affichées aux valeurs attendues par le backend
    const sortMapping = {
      "Most recent": "recent",
      "A - Z": "alphabetical",
    };
    setSortBy(sortMapping[value] || "recent");
  };

  return (
    <div className="flex flex-col mx-4 max-w-7xl w-full">
      {/* titre de la section */}
      <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl mt-10 mb-10 text-center">
        Discover an infinity of profiles
      </h1>

      {/* sous titre */}
      <p className="text-secondary-100 text-center mb-8 mx-4">
        Choose among the most recent profiles or sort them alphabetically
      </p>

      {/* barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 mx-4 items-stretch">
        {/* barre de recherche */}
        <input
          type="text"
          placeholder="Search profiles by username..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:flex-1 bg-secondary-800 border border-secondary-700 rounded-xl px-4 py-3 text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />

        {/* filtre de tri */}
        <select
          value={sortBy === "recent" ? "Most recent" : "A - Z"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full sm:w-auto sm:min-w-[200px] border border-secondary-700 bg-secondary-800 rounded-xl px-4 py-3 text-secondary-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="Most recent">Most recent</option>
          <option value="A - Z">A - Z</option>
        </select>
      </div>

      {/* grille des profils */}
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
              <ProfileCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>

      {/* affiche le nombre de profils chargés */}
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
