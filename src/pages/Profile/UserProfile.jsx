import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserGameSettings } from "../../api/auth.api";
import {
  generateMouseCommands,
  generateViewmodelCommands,
  generateDisplayCommands,
  generateHudCommands,
  generateRadarCommands,
} from "../../utils/cs2Commands";

import toast from "react-hot-toast";
import SectionTitle from "../../components/Common/SectionsTitle";
import DisplayValue from "../../components/Common/DisplayValue";
import Button from "../../components/Common/Button";
import defaultAvatar from "../../assets/images/defaultAvatar.webp";

export default function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserGameSettings(userId);

        if (response) {
          setUserData(response);
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserProfile();
    }
  }, [userId]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Profile link copied!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-secondary-100 text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-secondary-100 text-xl">Profile not found</p>
      </div>
    );
  }

  const formData = userData.gameSettings || {};

  return (
    <div className="flex flex-col mx-4 max-w-4xl w-full">
      {/* Profile header */}
      <div className="flex flex-col items-center mt-10 mb-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-primary-500/25 flex items-center justify-center mb-4 overflow-hidden">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={defaultAvatar}
              alt="Default Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Username */}
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl mb-4">
          {userData.username || "Username"}
        </h1>

        {/* Boutons */}
        <div className="flex gap-4 justify-center mb-10">
          <Button
            colorVariant="btnSecondaryBlue"
            text="Copy link"
            className="w-50"
            onClick={handleCopyLink}
          />
        </div>
      </div>

      {/* Section Mouse */}
      <div>
        <SectionTitle icon="mouse" placeholder="Mouse Settings" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateMouseCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue title="DPI" value={formData.dpi} />
          <DisplayValue
            title="Polling Rate"
            value={formData.pollingRate}
            unit=" Hz"
          />
          <DisplayValue title="Sensitivity" value={formData.sensitivity} />
          <DisplayValue
            title="Zoom sensitivity"
            value={formData.zoomSensitivity}
          />
          <DisplayValue
            title="Windows Sensitivity"
            value={formData.windowsSensitivity}
          />
        </div>
      </div>

      {/* Section Crosshair */}
      <div>
        <SectionTitle icon="crosshair" placeholder="Crosshair" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue
            title="Crosshair Style"
            value={formData.crosshairStyle}
          />
          <DisplayValue
            title="Friendly Fire Warning"
            value={formData.friendlyFireWarning}
          />
          <DisplayValue title="Follow Recoil" value={formData.followRecoil} />
          <DisplayValue title="Center Dot" value={formData.centerDot} />
          <DisplayValue title="Length" value={formData.length} />
          <DisplayValue title="Thickness" value={formData.thickness} />
          <DisplayValue title="Gap" value={formData.gap} />
          <DisplayValue title="Outline" value={formData.outline} />
          <DisplayValue title="Red" value={formData.red} />
          <DisplayValue title="Green" value={formData.green} />
          <DisplayValue title="Blue" value={formData.blue} />
          <DisplayValue title="Alpha" value={formData.alpha} />
          <DisplayValue title="T-Style" value={formData.tStyle} />
        </div>
      </div>

      {/* Section Viewmodel */}
      <div>
        <SectionTitle icon="eye" placeholder="Viewmodel" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateViewmodelCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue title="FOV" value={formData.fov} />
          <DisplayValue title="Offset X" value={formData.offsetX} />
          <DisplayValue title="Offset Y" value={formData.offsetY} />
          <DisplayValue title="Offset Z" value={formData.offsetZ} />
          <DisplayValue title="Hand Position" value={formData.handPosition} />
        </div>
      </div>

      {/* Section Display */}
      <div>
        <SectionTitle icon="desktopWindows" placeholder="Display Settings" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateDisplayCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue title="Display Mode" value={formData.displayMode} />
          <DisplayValue title="Aspect Ratio" value={formData.aspectRatio} />
          <DisplayValue title="Resolution" value={formData.resolution} />
          <DisplayValue
            title="Refresh Rate"
            value={formData.refreshRate}
            unit=" Hz"
          />
          <DisplayValue
            title="Luminosity"
            value={formData.luminosity}
            unit="%"
          />
        </div>
      </div>

      {/* Section Video */}
      <div>
        <SectionTitle icon="camera" placeholder="Video Settings" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue title="V-sync" value={formData.vsync} />
          <DisplayValue title="NVIDIA Reflex" value={formData.nvidiaReflex} />
          <DisplayValue
            title="Boost Player Contrast"
            value={formData.boostPlayerContrast}
          />
          <DisplayValue title="Anti Aliasing" value={formData.antiAliasing} />
          <DisplayValue
            title="Dynamic Shadows"
            value={formData.dynamicShadows}
          />
          <DisplayValue
            title="Texture Details"
            value={formData.textureDetails}
          />
          <DisplayValue
            title="Texture Filtering"
            value={formData.textureFiltering}
          />
          <DisplayValue title="Shader Detail" value={formData.shaderDetail} />
          <DisplayValue
            title="Particle Detail"
            value={formData.particleDetail}
          />
          <DisplayValue
            title="Ambiant Occlusion"
            value={formData.ambiantOcclusion}
          />
          <DisplayValue title="HDR" value={formData.hdr} />
          <DisplayValue title="FidelityFX" value={formData.fidelityFX} />
        </div>
      </div>

      {/* Section HUD */}
      <div>
        <SectionTitle icon="dashboard" placeholder="HUD" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateHudCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue title="HUD Scale" value={formData.hudScale} />
          <DisplayValue title="HUD Color" value={formData.hudColor} />
        </div>
      </div>

      {/* Section Radar */}
      <div>
        <SectionTitle icon="explore" placeholder="Radar" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateRadarCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <DisplayValue
            title="Player Centered"
            value={formData.playerCentered}
          />
          <DisplayValue title="Radar Rotating" value={formData.radarRotating} />
          <DisplayValue title="Radar Opacity" value={formData.radarOpacity} />
          <DisplayValue title="HUD Size" value={formData.hudSize} />
          <DisplayValue title="Map Zoom" value={formData.mapZoom} />
          <DisplayValue
            title="Map Alternate Zoom"
            value={formData.mapAlternateZoom}
          />
          <DisplayValue title="Dynamic Zoom" value={formData.dynamicZoom} />
        </div>
      </div>
    </div>
  );
}
