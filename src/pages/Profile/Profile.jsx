import { useAuth } from "../../context/AuthContext";

import Button from "../../components/Common/Button";
import SectionTitle from "../../components/Common/SectionsTitle";
import InputText from "../../components/Common/InputText";
import InputList from "../../components/Common/InputList";
import defaultAvatar from "../../assets/images/defaultAvatar.webp";

export default function Profile() {
  const { userConnected } = useAuth();

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
            <img src={defaultAvatar} alt="Default avatar" />
          )}
        </div>
        {/* Username */}
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl mb-4">
          {userConnected?.username || "Username"}
        </h1>
      </div>

      {/* Buttons change et share */}
      <div className="flex gap-4 justify-center">
        <Button
          colorVariant="btnSecondaryBlue"
          text="Change my settings"
          className="w-50"
          onClick={() => {
            console.log("Discard changes"); //ajouter la logique
          }}
        />
        <Button
          colorVariant="btnPrimaryBlue"
          text="Share my profile"
          className="w-50"
          onClick={() => {
            console.log("Save changes"); //ajouter la logique
          }}
        />
      </div>

      {/* Buttons annuler et save */}
      <div className="flex gap-4 justify-center">
        <Button
          colorVariant="btnSecondaryRed"
          text="Discard changes"
          className="w-50"
          onClick={() => {
            console.log("Discard changes"); //ajouter la logique
          }}
        />
        <Button
          colorVariant="btnSecondaryGreen"
          text="Save changes"
          className="w-50"
          onClick={() => {
            console.log("Save changes"); //ajouter la logique
          }}
        />
      </div>

      {/* Section Mouse */}
      <div>
        <SectionTitle icon="mouse" placeholder="Mouse Settings" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputText title="DPI" placeholder="Enter your option" />
          <InputText title="Polling Rate" placeholder="Enter your option" />
          <InputText
            title="Sensitivity"
            placeholder="Enter your option"
            helperText="Value from .. to .."
          />
          <InputText
            title="Zoom sensitivity"
            placeholder="Enter your option"
            helperText="Value from 0.1 to 3"
          />
          <InputText
            title="Windows Sensitivity"
            placeholder="Enter your option"
            helperText="Value from 0 to 20"
          />
        </div>
      </div>

      {/* Section Crosshair */}
      <div>
        <SectionTitle icon="crosshair" placeholder="Crosshair" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputList
            title="Crosshair Style"
            placeholder="Select an option"
            options={["Classic", "Classic Static", "Legacy"]}
          />
          <InputList
            title="Friendly Fire Warning"
            placeholder="Select an option"
            options={["Always On", "Always Off"]}
          />
          <InputList
            title="Follow Recoil"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
          <InputList
            title="Center Dot"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
          <InputText
            title="Length"
            placeholder="Enter your option"
            helperText="From 0 to 10"
          />
          <InputText
            title="Thickness"
            placeholder="Enter your option"
            helperText="From 0.1 to 6"
          />
          <InputText
            title="Gap"
            placeholder="Enter your option"
            helperText="From -5 to 5"
          />
          <InputText
            title="Outline"
            placeholder="Enter your option"
            helperText="Form 0 to 3"
          />
          <InputText
            title="Red"
            placeholder="Enter your option"
            helperText="From 0 to 255"
          />
          <InputText
            title="Green"
            placeholder="Enter your option"
            helperText="From 0 to 255"
          />
          <InputText
            title="Blue"
            placeholder="Enter your option"
            helperText="From 0 et 255"
          />
          <InputText
            title="Alpha"
            placeholder="Enter your option"
            helperText="From 0 to 255"
          />
          <InputList
            title="T-Style"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
        </div>
      </div>

      {/* Section Viewmodel */}
      <div>
        <SectionTitle icon="eye" placeholder="Viewmodel" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputText title="FOV" placeholder="Enter your option" />
          <InputText title="Offset X" placeholder="Enter your option" />
          <InputText title="Offset Y" placeholder="Enter your option" />
          <InputText title="Offset Z" placeholder="Enter your option" />
          <InputList
            title="Windows Sensitivity"
            placeholder="Select an option"
            options={["Left", "Right"]}
          />
        </div>
      </div>

      {/* Section Display */}
      <div>
        <SectionTitle icon="desktopWindows" placeholder="Display Settings" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputList
            title="Display Mode"
            placeholder="Select an option"
            options={["Windowed", "Fullscreen", "Fullscreen Windowed"]}
          />
          <InputList
            title="Aspect Ratio"
            placeholder="Select an option"
            options={["Normal 3:4", "Widescreeen 16:9", "Widescreen 16:10"]}
          />
          <InputText title="Resolution" placeholder="Enter your option" />
          <InputText title="Refresh Rate" placeholder="Enter your option" />
          <InputText
            title="Luminosity"
            placeholder="Enter your option"
            helperText="Value from 33% to 133%"
          />
        </div>
      </div>

      {/* Section Video */}
      <div>
        <SectionTitle icon="camera" placeholder="Video Settings" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputList
            title="V-sync"
            placeholder="Select an option"
            options={["Enabled", "Disabled"]}
          />
          <InputList
            title="NVIDIA Reflex"
            placeholder="Select an option"
            options={["Enabled", "Disabled", " Enabled + Boost"]}
          />
          <InputList
            title="Boost Player Contrast"
            placeholder="Select an option"
            options={["Enabled", "Disabled"]}
          />
          <InputList
            title="Antoi Aliasing"
            placeholder="Select an option"
            options={["None", "CMAA2", "2x MSAA", "4x MSAA", "8x MSAA"]}
          />
          <InputList
            title="Dynamic Shadows"
            placeholder="Select an option"
            options={["Sun Only", "All"]}
          />
          <InputList
            title="Texture Details"
            placeholder="Select an option"
            options={["Low", "Medium", "High"]}
          />
          <InputList
            title="Texture Filtering"
            placeholder="Select an option"
            options={[
              "Bilinar",
              "Trilinear",
              "Anisotropic 2x",
              "Anisotropic 4x",
              "Anisotropic 8x",
              "Anisotropic 16x",
            ]}
          />
          <InputList
            title="Shader Detail"
            placeholder="Select an option"
            options={["Low", "High"]}
          />
          <InputList
            title="Particle Detail"
            placeholder="Select an option"
            options={["Low", "Medium", "High", "Very High"]}
          />
          <InputList
            title="Ambiant Occlusion"
            placeholder="Select an option"
            options={["Disabled", "Medium", "High"]}
          />
          <InputList
            title="HDR"
            placeholder="Select an option"
            options={["Performance", "Quality"]}
          />
          <InputList
            title="FidelityFX"
            placeholder="Select an option"
            options={[
              "Performance",
              "Balanced",
              "Quality",
              "Ultra Quality",
              "Disabled",
            ]}
          />
        </div>
      </div>

      {/* Section HUD */}
      <div>
        <SectionTitle icon="dashboard" placeholder="HUD" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputText
            title="HUD Scale"
            placeholder="Enter your option"
            helperText="Value from 0.9 to 1.11"
          />
          <InputList
            title="HUD Color"
            placeholder="Select an option"
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
          />
        </div>
      </div>

      {/* Section Radar */}
      <div>
        <SectionTitle icon="explore" placeholder="Radar" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-10">
          <InputList
            title="Player Centered"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
          <InputList
            title="Radar Rotating"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
          <InputText
            title="Radar Opacity"
            placeholder="Enter your option"
            helperText="Value from 0 to 1"
          />
          <InputText
            title="HUD Size"
            placeholder="Enter your option"
            helperText="Value from 0.8 to 1.3"
          />
          <InputText
            title="Map Zoom"
            placeholder="Enter your option"
            helperText="Value from 0.25 to 1"
          />
          <InputText
            title="Map Alternate Zoom"
            placeholder="Enter your option"
            helperText="Value from 0.25 to 1"
          />
          <InputList
            title="Dynamic Zoom"
            placeholder="Select an option"
            options={["Yes", "No"]}
          />
        </div>
      </div>
    </div>
  );
}
