import Icon from "./Icon";
import Button from "./Button";

export default function ProfileCard({ user, onBookmark, isBookmarked }) {
  // ↑ composant card pour afficher les profils utilisateur

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));

    if (diffInMinutes < 1) return "updated now";
    if (diffInMinutes < 60) return `updated ${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `updated ${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `updated ${diffInDays} days ago`;
  };

  return (
    <div className="bg-secondary-800 border border-secondary-700 rounded-2xl p-4 relative overflow-hidden hover:border-secondary-600 transition-colors duration-300 ease-custom">
      {/* Avatar et nom */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-xl bg-primary-500/25 flex items-center justify-center mb-3 overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="placeholder" size={32} className="text-primary-400" />
          )}
        </div>

        <h3 className="text-secondary-100 font-schibsted-grotesk font-bold text-lg text-center mb-1">
          {user.username}
        </h3>

        <p className="text-secondary-400 text-sm">
          {formatTimeAgo(user.updatedAt || user.createdAt)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onBookmark(user._id)}
          className={`p-2 rounded-lg transition-colors duration-300 ease-custom ${
            isBookmarked
              ? "bg-primary-500/25 text-primary-400"
              : "bg-secondary-700 text-secondary-400 hover:bg-secondary-600"
          }`}
        >
          <Icon name="bookmark" size={20} />
        </button>

        <Button
          colorVariant="btnSecondaryYellow"
          text="Full view"
          className="text-sm px-4 py-2"
          to={`/profile/${user._id}`} // route vers le profil complet
        />
      </div>
    </div>
  );
}
