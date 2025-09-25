import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { uploadAvatar } from "../../lib/uploadService";
import { updateUserProfile } from "../../api/auth.api";

import defaultAvatar from "../../assets/images/defaultAvatar.webp";
import Icon from "../../components/Common/Icon";
import Button from "../../components/Common/Button";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const { userConnected } = useAuth();
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

  // feedbacks
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

  const isPasswordFromComplete =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

  const canSubmit = (avatarFile || isPasswordFromComplete) && !loading;

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

  const submit = async () => {
    if (!canSubmit) {
      toast.error("No change saved");
      return;
    }

    if (isPasswordFromComplete && newPassword !== confirmPassword) {
      setPasswordError("New passwords are different");
      return;
    }

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

      if (isPasswordFromComplete) {
        payload.newPassword = newPassword;
        payload.currentPassword = currentPassword;
      }

      const updatedUser = await updateUserProfile(payload);

      if (!updatedUser.message) {
        toast.success("Profile updated");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      } else {
        toast.error(updatedUser.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-10 mt-10 sm:whitespace-nowrap text-center">
        Modify my account settings
      </h1>
      <div className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-2xl py-3 sm:py-7 px-3 sm:px-7">
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

        {/* Email */}
        <div className="flex flex-col mb-10">
          <label className="mb-2 text-base lg:text-lg font-semibold text-primary-400">
            Email
          </label>
          <input
            type="email"
            value={userConnected.email}
            disabled
            className="border border-secondary-800 rounded-xl px-3 py-2 text-base lg:text-lg text-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-not-allowed"
          />
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
        />
      </div>
    </div>
  );
}
