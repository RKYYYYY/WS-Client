import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getGameSettings, updateGameSettings } from "../../api/auth.api";
import {
  generateMouseCommands,
  generateViewmodelCommands,
  generateDisplayCommands,
  generateHudCommands,
  generateRadarCommands,
} from "../../utils/cs2Commands";

import toast from "react-hot-toast";
import SectionTitle from "../../components/Common/SectionsTitle";
import InputText from "../../components/Common/InputText";
import InputList from "../../components/Common/InputList";
import DisplayValue from "../../components/Common/DisplayValue";
import Button from "../../components/Common/Button";
import defaultAvatar from "../../assets/images/defaultAvatar.webp";
import CommandCopy from "../../components/Common/CommandCopy";

export default function Profile() {
  const { userConnected } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Valeurs par défaut selon VOTRE schéma
  const defaultSettings = {
    // Mouse Settings
    dpi: null,
    pollingRate: null,
    sensitivity: null,
    zoomSensitivity: null,
    windowsSensitivity: null,
    // Crosshair
    crosshairStyle: "Classic",
    friendlyFireWarning: "Always On",
    followRecoil: "No",
    centerDot: "Yes",
    length: null,
    thickness: null,
    gap: null,
    outline: null,
    red: null,
    green: null,
    blue: null,
    alpha: null,
    tStyle: "No",
    // Viewmodel
    fov: null,
    offsetX: null,
    offsetY: null,
    offsetZ: null,
    handPosition: "Right",
    // Display Settings
    displayMode: "Fullscreen Windowed",
    aspectRatio: "Widescreen 16:9",
    resolution: null,
    refreshRate: null,
    luminosity: null,
    // Video Settings
    vsync: "Disabled",
    nvidiaReflex: "Disabled",
    boostPlayerContrast: "Disabled",
    antiAliasing: "None",
    dynamicShadows: "Sun Only",
    textureDetails: "Medium",
    textureFiltering: "Bilinear",
    shaderDetail: "Low",
    particleDetail: "Low",
    ambiantOcclusion: "Disabled",
    hdr: "Performance",
    fidelityFX: "Disabled",
    // HUD
    hudScale: null,
    hudColor: "White",
    // Radar
    playerCentered: "Yes",
    radarRotating: "Yes",
    radarOpacity: null,
    hudSize: null,
    mapZoom: null,
    mapAlternateZoom: null,
    dynamicZoom: "Yes",
  };

  const [formData, setFormData] = useState(defaultSettings);
  const [initialData, setInitialData] = useState(defaultSettings);

  // calculer l'eDPI
  const calcEDPI = () => {
    const dpi = formData.dpi;
    const sensitivity = formData.sensitivity;

    if (dpi && sensitivity && dpi !== null && sensitivity !== null) {
      return (dpi * sensitivity).toFixed(0);
    }
    return null;
  };

  useEffect(() => {
    const loadGameSettings = async () => {
      try {
        setLoading(true);
        const response = await getGameSettings();

        if (
          response.gameSettings &&
          Object.keys(response.gameSettings).length > 0
        ) {
          const mergedSettings = {
            ...defaultSettings,
            ...response.gameSettings,
          };
          setFormData(mergedSettings);
          setInitialData(mergedSettings);
        }
      } catch (error) {
        console.error("Error loading game settings:", error);
        toast.error("Failed to load game settings");
      } finally {
        setLoading(false);
      }
    };

    if (userConnected) {
      loadGameSettings();
    }
  }, [userConnected]);

  const handleChangeSettings = () => {
    setIsEditing(true);
    setInitialData(formData);
  };

  const handleDiscardChanges = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    const toastId = toast.loading("Saving settings...");

    try {
      // conversion des valeurs
      const processedData = { ...formData };

      // liste de tous les champs
      const numericFields = [
        "dpi",
        "pollingRate",
        "sensitivity",
        "zoomSensitivity",
        "windowsSensitivity",
        "length",
        "thickness",
        "gap",
        "outline",
        "red",
        "green",
        "blue",
        "alpha",
        "fov",
        "offsetX",
        "offsetY",
        "offsetZ",
        "refreshRate",
        "luminosity",
        "hudScale",
        "radarOpacity",
        "hudSize",
        "mapZoom",
        "mapAlternateZoom",
      ];

      // conversion auto string en number (ou null)
      numericFields.forEach((field) => {
        if (processedData[field] === "" || processedData[field] === null) {
          processedData[field] = null;
        } else {
          const numValue = Number(processedData[field]);
          if (!isNaN(numValue)) {
            processedData[field] = numValue;
          }
        }
      });

      console.log("Data sent to backend:", processedData);

      const response = await updateGameSettings(processedData);

      if (response.message === "Game settings updated successfully") {
        // recharger les données depuis le serveur
        const refreshedData = await getGameSettings();
        if (
          refreshedData.gameSettings &&
          Object.keys(refreshedData.gameSettings).length > 0
        ) {
          const mergedSettings = {
            ...defaultSettings,
            ...refreshedData.gameSettings,
          };
          setFormData(mergedSettings);
          setInitialData(mergedSettings);
        }

        toast.success("Settings saved successfully!", { id: toastId });
        setIsEditing(false);
      } else if (response.errors) {
        toast.error(response.errors.join(", "), { id: toastId });
      } else {
        toast.error(response.message || "Failed to save settings", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error saving game settings:", error);
      toast.error("An error occurred while saving settings", { id: toastId });
    }
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${userConnected._id}`;

    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        toast.success("Profile link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-secondary-100 text-xl">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-4 max-w-4xl w-full">
      {/* Profile header */}
      <div className="flex flex-col items-center mt-10 mb-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-primary-500/25 flex items-center justify-center mb-4 overflow-hidden">
          {userConnected?.avatar ? (
            <img
              src={userConnected.avatar}
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
          {userConnected?.username || "Username"}
        </h1>

        {/* Boutons conditionnels */}
        {!isEditing ? (
          <div className="flex gap-4 justify-center mb-10">
            <Button
              colorVariant="btnSecondaryBlue"
              text="Change my settings"
              className="sm:w-50 w-45"
              onClick={handleChangeSettings}
            />
            <Button
              colorVariant="btnPrimaryBlue"
              text="Share my profile"
              className="sm:w-50 w-45"
              onClick={handleShareProfile}
            />
          </div>
        ) : (
          <div className="flex gap-4 justify-center mb-10">
            <Button
              colorVariant="btnSecondaryRed"
              text="Discard changes"
              className="sm:w-50 w-45"
              onClick={handleDiscardChanges}
            />
            <Button
              colorVariant="btnPrimaryGreen"
              text="Save changes"
              className="sm:w-50 w-45"
              onClick={handleSaveChanges}
            />
          </div>
        )}
      </div>

      {/* Section Mouse */}
      <div>
        <SectionTitle icon="mouse" placeholder="Mouse Settings" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateMouseCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputText
                title="DPI"
                placeholder="Enter your DPI"
                value={formData.dpi ?? ""}
                onChange={(value) => handleInputChange("dpi", value)}
                type="number"
                min={100}
                max={20000}
                helperText="Value from 100 to 20000"
              />
              <InputText
                title="Polling Rate"
                placeholder="Enter polling rate"
                value={formData.pollingRate ?? ""}
                onChange={(value) => handleInputChange("pollingRate", value)}
                type="number"
                min={100}
                max={8000}
                helperText="Value from 100 to 8000 Hz"
              />
              <InputText
                title="Sensitivity"
                placeholder="Enter sensitivity"
                value={formData.sensitivity ?? ""}
                onChange={(value) => handleInputChange("sensitivity", value)}
                type="number"
                min={0.1}
                max={8}
                helperText="Value from 0.1 to 8"
              />
              <InputText
                title="Zoom sensitivity"
                placeholder="Enter zoom sensitivity"
                value={formData.zoomSensitivity ?? ""}
                onChange={(value) =>
                  handleInputChange("zoomSensitivity", value)
                }
                type="number"
                min={0.1}
                max={3}
                helperText="Value from 0.1 to 3"
              />
              <InputText
                title="Windows Sensitivity"
                placeholder="Enter windows sensitivity"
                value={formData.windowsSensitivity ?? ""}
                onChange={(value) =>
                  handleInputChange("windowsSensitivity", value)
                }
                type="number"
                min={1}
                max={11}
                helperText="Value from 1 to 11"
              />
              <DisplayValue title="eDPI" value={calcEDPI()} emptyText="-" />
            </>
          ) : (
            <>
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
              <DisplayValue title="eDPI" value={calcEDPI()} emptyText="-" />
            </>
          )}
        </div>
      </div>

      {/* Section Crosshair */}
      <div>
        <SectionTitle icon="crosshair" placeholder="Crosshair" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputList
                title="Crosshair Style"
                options={["Classic", "Classic Static", "Legacy"]}
                value={formData.crosshairStyle}
                onChange={(value) => handleInputChange("crosshairStyle", value)}
              />
              <InputList
                title="Friendly Fire Warning"
                options={["Always On", "Always Off"]}
                value={formData.friendlyFireWarning}
                onChange={(value) =>
                  handleInputChange("friendlyFireWarning", value)
                }
              />
              <InputList
                title="Follow Recoil"
                options={["Yes", "No"]}
                value={formData.followRecoil}
                onChange={(value) => handleInputChange("followRecoil", value)}
              />
              <InputList
                title="Center Dot"
                options={["Yes", "No"]}
                value={formData.centerDot}
                onChange={(value) => handleInputChange("centerDot", value)}
              />
              <InputText
                title="Length"
                placeholder="Enter length"
                value={formData.length ?? ""}
                onChange={(value) => handleInputChange("length", value)}
                type="number"
                min={0}
                max={10}
                helperText="From 0 to 10"
              />
              <InputText
                title="Thickness"
                placeholder="Enter thickness"
                value={formData.thickness ?? ""}
                onChange={(value) => handleInputChange("thickness", value)}
                type="number"
                min={0.1}
                max={6}
                helperText="From 0.1 to 6"
              />
              <InputText
                title="Gap"
                placeholder="Enter gap"
                value={formData.gap ?? ""}
                onChange={(value) => handleInputChange("gap", value)}
                type="number"
                min={-5}
                max={5}
                helperText="From -5 to 5"
              />
              <InputText
                title="Outline"
                placeholder="Enter outline"
                value={formData.outline ?? ""}
                onChange={(value) => handleInputChange("outline", value)}
                type="number"
                min={0}
                max={3}
                helperText="From 0 to 3"
              />
              <InputText
                title="Red"
                placeholder="Red value"
                value={formData.red ?? ""}
                onChange={(value) => handleInputChange("red", value)}
                type="number"
                min={0}
                max={255}
                helperText="From 0 to 255"
              />
              <InputText
                title="Green"
                placeholder="Green value"
                value={formData.green ?? ""}
                onChange={(value) => handleInputChange("green", value)}
                type="number"
                min={0}
                max={255}
                helperText="From 0 to 255"
              />
              <InputText
                title="Blue"
                placeholder="Blue value"
                value={formData.blue ?? ""}
                onChange={(value) => handleInputChange("blue", value)}
                type="number"
                min={0}
                max={255}
                helperText="From 0 to 255"
              />
              <InputText
                title="Alpha"
                placeholder="Alpha value"
                value={formData.alpha ?? ""}
                onChange={(value) => handleInputChange("alpha", value)}
                type="number"
                min={0}
                max={255}
                helperText="From 0 to 255"
              />
              <InputList
                title="T-Style"
                options={["Yes", "No"]}
                value={formData.tStyle}
                onChange={(value) => handleInputChange("tStyle", value)}
              />
            </>
          ) : (
            <>
              <DisplayValue
                title="Crosshair Style"
                value={formData.crosshairStyle}
              />
              <DisplayValue
                title="Friendly Fire Warning"
                value={formData.friendlyFireWarning}
              />
              <DisplayValue
                title="Follow Recoil"
                value={formData.followRecoil}
              />
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
            </>
          )}
        </div>
      </div>

      {/* Section Viewmodel */}
      <div>
        <SectionTitle icon="eye" placeholder="Viewmodel" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateViewmodelCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputText
                title="FOV"
                placeholder="Enter FOV"
                value={formData.fov ?? ""}
                onChange={(value) => handleInputChange("fov", value)}
                type="number"
                min={54}
                max={68}
                helperText="From 54 to 68"
              />
              <InputText
                title="Offset X"
                placeholder="Enter offset X"
                value={formData.offsetX ?? ""}
                onChange={(value) => handleInputChange("offsetX", value)}
                type="number"
                min={-2.5}
                max={2.5}
                helperText="From -2.5 to 2.5"
              />
              <InputText
                title="Offset Y"
                placeholder="Enter offset Y"
                value={formData.offsetY ?? ""}
                onChange={(value) => handleInputChange("offsetY", value)}
                type="number"
                min={-2}
                max={2}
                helperText="From -2 to 2"
              />
              <InputText
                title="Offset Z"
                placeholder="Enter offset Z"
                value={formData.offsetZ ?? ""}
                onChange={(value) => handleInputChange("offsetZ", value)}
                type="number"
                min={-2}
                max={2}
                helperText="From -2 to 2"
              />
              <InputList
                title="Hand Position"
                options={["Left", "Right"]}
                value={formData.handPosition}
                onChange={(value) => handleInputChange("handPosition", value)}
              />
            </>
          ) : (
            <>
              <DisplayValue title="FOV" value={formData.fov} />
              <DisplayValue title="Offset X" value={formData.offsetX} />
              <DisplayValue title="Offset Y" value={formData.offsetY} />
              <DisplayValue title="Offset Z" value={formData.offsetZ} />
              <DisplayValue
                title="Hand Position"
                value={formData.handPosition}
              />
            </>
          )}
        </div>
      </div>

      {/* Section Display */}
      <div>
        <SectionTitle icon="desktopWindows" placeholder="Display Settings" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateDisplayCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputList
                title="Display Mode"
                options={["Windowed", "Fullscreen", "Fullscreen Windowed"]}
                value={formData.displayMode}
                onChange={(value) => handleInputChange("displayMode", value)}
              />
              <InputList
                title="Aspect Ratio"
                options={["Normal 3:4", "Widescreen 16:9", "Widescreen 16:10"]}
                value={formData.aspectRatio}
                onChange={(value) => handleInputChange("aspectRatio", value)}
              />
              <InputText
                title="Resolution"
                placeholder="1920x1080"
                value={formData.resolution ?? ""}
                onChange={(value) => handleInputChange("resolution", value)}
                type="text"
                helperText="Example: 1920x1080"
              />
              <InputText
                title="Refresh Rate"
                placeholder="Enter refresh rate"
                value={formData.refreshRate ?? ""}
                onChange={(value) => handleInputChange("refreshRate", value)}
                type="number"
                min={60}
                max={540}
                helperText="From 60 to 540 Hz"
              />
              <InputText
                title="Luminosity"
                placeholder="Enter luminosity"
                value={formData.luminosity ?? ""}
                onChange={(value) => handleInputChange("luminosity", value)}
                type="number"
                min={33}
                max={133}
                helperText="From 33% to 133%"
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Section Video */}
      <div>
        <SectionTitle icon="camera" placeholder="Video Settings" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputList
                title="V-sync"
                options={["Enabled", "Disabled"]}
                value={formData.vsync}
                onChange={(value) => handleInputChange("vsync", value)}
              />
              <InputList
                title="NVIDIA Reflex"
                options={["Enabled", "Disabled", "Enabled + Boost"]}
                value={formData.nvidiaReflex}
                onChange={(value) => handleInputChange("nvidiaReflex", value)}
              />
              <InputList
                title="Boost Player Contrast"
                options={["Enabled", "Disabled"]}
                value={formData.boostPlayerContrast}
                onChange={(value) =>
                  handleInputChange("boostPlayerContrast", value)
                }
              />
              <InputList
                title="Anti Aliasing"
                options={["None", "CMAA2", "2x MSAA", "4x MSAA", "8x MSAA"]}
                value={formData.antiAliasing}
                onChange={(value) => handleInputChange("antiAliasing", value)}
              />
              <InputList
                title="Dynamic Shadows"
                options={["Sun Only", "All"]}
                value={formData.dynamicShadows}
                onChange={(value) => handleInputChange("dynamicShadows", value)}
              />
              <InputList
                title="Texture Details"
                options={["Low", "Medium", "High"]}
                value={formData.textureDetails}
                onChange={(value) => handleInputChange("textureDetails", value)}
              />
              <InputList
                title="Texture Filtering"
                options={[
                  "Bilinear",
                  "Trilinear",
                  "Anisotropic 2x",
                  "Anisotropic 4x",
                  "Anisotropic 8x",
                  "Anisotropic 16x",
                ]}
                value={formData.textureFiltering}
                onChange={(value) =>
                  handleInputChange("textureFiltering", value)
                }
              />
              <InputList
                title="Shader Detail"
                options={["Low", "High"]}
                value={formData.shaderDetail}
                onChange={(value) => handleInputChange("shaderDetail", value)}
              />
              <InputList
                title="Particle Detail"
                options={["Low", "Medium", "High", "Very High"]}
                value={formData.particleDetail}
                onChange={(value) => handleInputChange("particleDetail", value)}
              />
              <InputList
                title="Ambiant Occlusion"
                options={["Disabled", "Medium", "High"]}
                value={formData.ambiantOcclusion}
                onChange={(value) =>
                  handleInputChange("ambiantOcclusion", value)
                }
              />
              <InputList
                title="HDR"
                options={["Performance", "Quality"]}
                value={formData.hdr}
                onChange={(value) => handleInputChange("hdr", value)}
              />
              <InputList
                title="FidelityFX"
                options={[
                  "Performance",
                  "Balanced",
                  "Quality",
                  "Ultra Quality",
                  "Disabled",
                ]}
                value={formData.fidelityFX}
                onChange={(value) => handleInputChange("fidelityFX", value)}
              />
            </>
          ) : (
            <>
              <DisplayValue title="V-sync" value={formData.vsync} />
              <DisplayValue
                title="NVIDIA Reflex"
                value={formData.nvidiaReflex}
              />
              <DisplayValue
                title="Boost Player Contrast"
                value={formData.boostPlayerContrast}
              />
              <DisplayValue
                title="Anti Aliasing"
                value={formData.antiAliasing}
              />
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
              <DisplayValue
                title="Shader Detail"
                value={formData.shaderDetail}
              />
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
            </>
          )}
        </div>
      </div>

      {/* Section HUD */}
      <div>
        <SectionTitle icon="dashboard" placeholder="HUD" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateHudCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputText
                title="HUD Scale"
                placeholder="Enter HUD scale"
                value={formData.hudScale ?? ""}
                onChange={(value) => handleInputChange("hudScale", value)}
                type="number"
                min={0.5}
                max={0.95}
                helperText="From 0.5 to 0.95"
              />
              <InputList
                title="HUD Color"
                options={[
                  "Team",
                  "Teammate",
                  "White",
                  "Bright White",
                  "Light Blue",
                  "Blue",
                  "Purple",
                  "Red",
                  "Orange",
                  "Yellow",
                  "Green",
                  "Aqua",
                  "Pink",
                ]}
                value={formData.hudColor}
                onChange={(value) => handleInputChange("hudColor", value)}
              />
            </>
          ) : (
            <>
              <DisplayValue title="HUD Scale" value={formData.hudScale} />
              <DisplayValue title="HUD Color" value={formData.hudColor} />
            </>
          )}
        </div>
      </div>

      {/* Section Radar */}
      <div>
        <SectionTitle icon="explore" placeholder="Radar" />
        <div className="mx-4 mt-6">
          <CommandCopy commands={generateRadarCommands(formData)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          {isEditing ? (
            <>
              <InputList
                title="Player Centered"
                options={["Yes", "No"]}
                value={formData.playerCentered}
                onChange={(value) => handleInputChange("playerCentered", value)}
              />
              <InputList
                title="Radar Rotating"
                options={["Yes", "No"]}
                value={formData.radarRotating}
                onChange={(value) => handleInputChange("radarRotating", value)}
              />
              <InputText
                title="Radar Opacity"
                placeholder="Enter opacity"
                value={formData.radarOpacity ?? ""}
                onChange={(value) => handleInputChange("radarOpacity", value)}
                type="number"
                min={0}
                max={1}
                helperText="From 0 to 1"
              />
              <InputText
                title="HUD Size"
                placeholder="Enter HUD size"
                value={formData.hudSize ?? ""}
                onChange={(value) => handleInputChange("hudSize", value)}
                type="number"
                min={0.8}
                max={1.3}
                helperText="From 0.8 to 1.3"
              />
              <InputText
                title="Map Zoom"
                placeholder="Enter map zoom"
                value={formData.mapZoom ?? ""}
                onChange={(value) => handleInputChange("mapZoom", value)}
                type="number"
                min={0.25}
                max={1}
                helperText="From 0.25 to 1"
              />
              <InputText
                title="Map Alternate Zoom"
                placeholder="Enter alternate zoom"
                value={formData.mapAlternateZoom ?? ""}
                onChange={(value) =>
                  handleInputChange("mapAlternateZoom", value)
                }
                type="number"
                min={0.25}
                max={1}
                helperText="From 0.25 to 1"
              />
              <InputList
                title="Dynamic Zoom"
                options={["Yes", "No"]}
                value={formData.dynamicZoom}
                onChange={(value) => handleInputChange("dynamicZoom", value)}
              />
            </>
          ) : (
            <>
              <DisplayValue
                title="Player Centered"
                value={formData.playerCentered}
              />
              <DisplayValue
                title="Radar Rotating"
                value={formData.radarRotating}
              />
              <DisplayValue
                title="Radar Opacity"
                value={formData.radarOpacity}
              />
              <DisplayValue title="HUD Size" value={formData.hudSize} />
              <DisplayValue title="Map Zoom" value={formData.mapZoom} />
              <DisplayValue
                title="Map Alternate Zoom"
                value={formData.mapAlternateZoom}
              />
              <DisplayValue title="Dynamic Zoom" value={formData.dynamicZoom} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
