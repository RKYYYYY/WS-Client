// commandes pour la souris
export const generateMouseCommands = (formData) => {
  const commands = [];

  // sensi
  if (formData.sensitivity !== null && formData.sensitivity !== "") {
    commands.push(`sensitivity ${formData.sensitivity}`);
  }

  // zoom sensi
  if (formData.zoomSensitivity !== null && formData.zoomSensitivity !== "") {
    commands.push(`zoom_sensitivity_ratio ${formData.zoomSensitivity}`);
  }

  return commands.length > 0 ? commands.join("; ") : "No settings configured";
};

// commandes pour le viewmodel
export const generateViewmodelCommands = (formData) => {
  const commands = [];

  // fov
  if (formData.fov !== null && formData.fov !== "") {
    commands.push(`viewmodel_fov ${formData.fov}`);
  }
  // offset x
  if (formData.offsetX !== null && formData.offsetX !== "") {
    commands.push(`viewmodel_offset_x ${formData.offsetX}`);
  }
  // offset y
  if (formData.offsetY !== null && formData.offsetY !== "") {
    commands.push(`viewmodel_offset_y ${formData.offsetY}`);
  }
  // offset z
  if (formData.offsetZ !== null && formData.offsetZ !== "") {
    commands.push(`viewmodel_offset_z ${formData.offsetZ}`);
  }
  // hand position
  if (formData.handPosition !== null && formData.handPosition !== "") {
    let handValue;
    if (formData.handPosition === "Right") {
      handValue = 0;
    } else if (formData.handPosition === "Left") {
      handValue = 1;
    }
    commands.push(`cl_righthand ${handValue}`);
  }
  return commands.length > 0 ? commands.join("; ") : "No settings configured.";
};

// commandes pour le display
export const generateDisplayCommands = (formData) => {
  const commands = [];

  // luminosity
  if (formData.luminosity !== null && formData.luminosity !== "") {
    commands.push(`luminosity ${formData.luminosity}`);
  }
  return commands.length > 0 ? commands.join("; ") : "No settings configured.";
};

// commandes pour l'hud
export const generateHudCommands = (formData) => {
  const commands = [];

  // hud scale
  if (formData.hudScale !== null && formData.hudScale !== "") {
    commands.push(`hud_scaling ${formData.hudScale}`);
  }
  return commands.length > 0 ? commands.join("; ") : "No settings configured.";
};

export const generateRadarCommands = (formData) => {
  const commands = [];

  // player centered
  if (formData.playerCentered !== null && formData.playerCentered !== "") {
    let CenterValue;
    if (formData.playerCentered === "Yes") {
      CenterValue = 1;
    } else if (formData.handPosition === "No") {
      CenterValue = 0;
    }
    commands.push(`cl_radar_always_centered ${CenterValue}`);
  }
  // radar rotate
  if (formData.radarRotating !== null && formData.radarRotating !== "") {
    let RotateValue;
    if (formData.radarRotating === "Yes") {
      RotateValue = 1;
    } else if (formData.handPosition === "No") {
      RotateValue = 0;
    }
    commands.push(`cl_radar_rotate ${RotateValue}`);
  }

  return commands.length > 0 ? commands.join("; ") : "No settings configured.";
};
