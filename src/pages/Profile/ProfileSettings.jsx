import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { uploadAvatar } from "../../lib/uploadService";
import { updateUserProfile } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

import defaultAvatar from "../../assets/images/defaultAvatar.webp";
import Icon from "../../components/Common/Icon";
import Button from "../../components/Common/Button";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const { userConnected, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // gestion des images
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(userConnected.avatar || defaultAvatar);
  const [objectUrl, setObjectUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // gestion des mots de passe
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // gestion du pseudo
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  // gestion de l'email
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // gestion de la suppression de compte
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // feedbacks
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const processFile = (file) => {
    console.log(file);

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please, select an image");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Image too heavy (5Mo max)");
      return;
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setObjectUrl(url);
    setAvatarFile(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isPasswordFormComplete =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

  const isUsernameFormComplete = newUsername.trim() !== "";
  const isEmailFormComplete = newEmail.trim() !== "";

  const canSubmit =
    (avatarFile ||
      isPasswordFormComplete ||
      isUsernameFormComplete ||
      isEmailFormComplete) &&
    !loading;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer?.files?.[0];

    processFile(file);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const submit = async () => {
    if (!canSubmit) {
      toast.error("No change to save");
      return;
    }

    // Réinitialiser les erreurs
    setPasswordError("");
    setUsernameError("");
    setEmailError("");

    // Validation du mot de passe
    if (isPasswordFormComplete && newPassword !== confirmPassword) {
      setPasswordError("New passwords are different");
      return;
    }

    // Validation du pseudo
    if (isUsernameFormComplete && newUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }

    // Validation de l'email
    if (isEmailFormComplete && !validateEmail(newEmail)) {
      setEmailError("Invalid email format");
      return;
    }

    const toastId = toast.loading("Updating profile...");
    setLoading(true);
    try {
      let avatarUrl;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      const payload = {};

      if (avatarUrl) {
        payload.avatar = avatarUrl;
      }

      if (isPasswordFormComplete) {
        payload.newPassword = newPassword;
        payload.currentPassword = currentPassword;
      }

      if (isUsernameFormComplete) {
        payload.username = newUsername;
      }

      if (isEmailFormComplete) {
        payload.email = newEmail;
      }

      const updatedUser = await updateUserProfile(payload);

      if (!updatedUser.message) {
        toast.success("Profile updated successfully!", { id: toastId });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setNewUsername("");
        setNewEmail("");
        setShowPasswordForm(false);
        setShowUsernameForm(false);
        setShowEmailForm(false);

        // Recharger la page pour mettre à jour le contexte
        window.location.reload();
      } else {
        toast.error(updatedUser.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    const toastId = toast.loading("Deleting account...");
    setLoading(true);

    try {
      // Appel API pour supprimer le compte
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/delete-account`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account deleted successfully", { id: toastId });
        logout();
        navigate("/");
      } else {
        toast.error(data.message || "Failed to delete account", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting account", { id: toastId });
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmText("");
    }
  };

  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-10 mt-10 sm:whitespace-nowrap text-center">
        Modify my account settings
      </h1>
      <div className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-2xl py-3 sm:py-7 px-3 sm:px-7">
        {/* Avatar */}
        <div className="flex flex-col mb-20">
          <label className="mb-10 text-base lg:text-lg font-semibold text-primary-400">
            Avatar
          </label>

          {/* Image */}
          <div className="flex justify-center">
            <div
              className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group ${
                dragActive ? "ring-3 ring-primary-400" : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <img
                src={preview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-secondary-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-secondary-100 text-center flex flex-col justify-center items-center gap-1">
                  <Icon name="pen" />
                  <p className="text-xs font-semibold">Change</p>
                </div>
              </div>

              {/* Drag overlay */}
              {dragActive && (
                <div className="absolute inset-0 bg-secondary-900/40 flex items-center justify-center">
                  <div className="text-secondary-100 text-center flex flex-col justify-center items-center gap-1">
                    <Icon name="pen" />
                    <p className="text-xs font-semibold">Drop here</p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col mb-10">
          <label className="mb-2 text-base lg:text-lg font-semibold text-primary-400">
            Username
          </label>
          <button
            type="button"
            onClick={() => setShowUsernameForm(!showUsernameForm)}
            className="w-full flex justify-between items-center px-3 py-2 bg-secondary-800 rounded-xl text-base lg:text-lg"
          >
            <span className="font-semibold text-secondary-100">
              {userConnected.username}
            </span>
            <span>
              {!showUsernameForm ? (
                <Icon name="arrowDown" className="text-secondary-100" />
              ) : (
                <Icon name="arrowUp" className="text-secondary-100" />
              )}
            </span>
          </button>
          {showUsernameForm && (
            <div className="mt-2 p-3 rounded-xl bg-secondary-800">
              <div className="flex flex-col mb-2">
                <label className="mb-2 text-base lg:text-lg font-semibold text-secondary-200">
                  New Username <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your new username"
                  className="border border-secondary-700 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              {usernameError && (
                <p className="text-red-400 text-base lg:text-lg mt-1">
                  {usernameError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col mb-10">
          <label className="mb-2 text-base lg:text-lg font-semibold text-primary-400">
            Email
          </label>
          <button
            type="button"
            onClick={() => setShowEmailForm(!showEmailForm)}
            className="w-full flex justify-between items-center px-3 py-2 bg-secondary-800 rounded-xl text-base lg:text-lg"
          >
            <span className="font-semibold text-secondary-100">
              {userConnected.email}
            </span>
            <span>
              {!showEmailForm ? (
                <Icon name="arrowDown" className="text-secondary-100" />
              ) : (
                <Icon name="arrowUp" className="text-secondary-100" />
              )}
            </span>
          </button>
          {showEmailForm && (
            <div className="mt-2 p-3 rounded-xl bg-secondary-800">
              <div className="flex flex-col mb-2">
                <label className="mb-2 text-base lg:text-lg font-semibold text-secondary-200">
                  New Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your new email"
                  className="border border-secondary-700 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-base lg:text-lg mt-1">
                  {emailError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col mb-2">
          <label className="mb-2 text-base lg:text-lg font-semibold text-primary-400">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full flex justify-between items-center px-3 py-2 bg-secondary-800 rounded-xl text-base lg:text-lg"
          >
            <span className="font-semibold text-secondary-100">
              Change password
            </span>
            <span>
              {!showPasswordForm ? (
                <Icon name="arrowDown" className="text-secondary-100" />
              ) : (
                <Icon name="arrowUp" className="text-secondary-100" />
              )}
            </span>
          </button>
          {showPasswordForm && (
            <div className="mt-2 p-3 rounded-xl bg-secondary-800">
              <div className="flex flex-col mb-2">
                <label className="mb-2 text-base lg:text-lg font-semibold text-secondary-200">
                  Current Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your current password"
                  className="border border-secondary-700 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-2 text-base lg:text-lg font-semibold text-secondary-200">
                  New password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="border border-secondary-700 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-2 text-base lg:text-lg font-semibold text-secondary-200">
                  Confirm new password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="border border-secondary-700 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red-400 text-base lg:text-lg mt-1">
                  {passwordError}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          colorVariant="btnPrimaryYellow"
          text={loading ? "Saving..." : "Save changes"}
          type="submit"
          onClick={submit}
          disabled={loading}
        />

        {/* Delete Account Section */}
        <div className="mt-10 pt-6 border-t border-secondary-700">
          <h2 className="text-red-400 text-lg font-bold mb-4">Danger Zone</h2>
          <p className="text-secondary-400 text-base mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          {!showDeleteConfirm ? (
            <Button
              colorVariant="btnSecondaryRed"
              text="Delete my account"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full"
            />
          ) : (
            <div className="bg-red-500/10 border border-red-400/50 rounded-xl p-4">
              <p className="text-secondary-200 text-sm mb-3">
                To confirm deletion, type{" "}
                <span className="font-bold text-red-400">DELETE</span> in the
                field below:
              </p>
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                className="w-full border border-red-400/50 bg-secondary-800 rounded-xl px-3 py-2 text-base text-secondary-200 focus:outline-none focus:ring-2 focus:ring-red-400 mb-3"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  colorVariant="btnSecondaryRed"
                  text="Cancel"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText("");
                  }}
                  className="flex-1"
                />
                <Button
                  colorVariant="btnPrimaryRed"
                  text="Confirm deletion"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "DELETE" || loading}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
