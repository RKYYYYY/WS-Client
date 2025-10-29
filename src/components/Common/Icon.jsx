import Bookmark from "../../assets/svgs/bookmark";
import Camera from "../../assets/svgs/camera";
import Check from "../../assets/svgs/check";
import Cross from "../../assets/svgs/cross";
import Crosshair from "../../assets/svgs/crosshair";
import Dashboard from "../../assets/svgs/dashboard";
import DesktopWindows from "../../assets/svgs/desktop_windows";
import Explore from "../../assets/svgs/explore";
import Eye from "../../assets/svgs/eye";
import FileCopy from "../../assets/svgs/file_copy";
import Home from "../../assets/svgs/home";
import Mouse from "../../assets/svgs/mouse";
import Placeholder from "../../assets/svgs/placeholder";
import ArrowUp from "../../assets/svgs/arrow_up";
import ArrowDown from "../../assets/svgs/arrow_down";
import ArrowLeft from "../../assets/svgs/arrow_left";
import ArrowRight from "../../assets/svgs/arrow_right";
import Pen from "../../assets/svgs/pen";
import logoWS from "../../assets/svgs/logoWS";

const iconRegistry = {
  bookmark: Bookmark,
  camera: Camera,
  check: Check,
  cross: Cross,
  crosshair: Crosshair,
  dashboard: Dashboard,
  desktopWindows: DesktopWindows,
  explore: Explore,
  eye: Eye,
  fileCopy: FileCopy,
  home: Home,
  mouse: Mouse,
  placeholder: Placeholder,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  pen: Pen,
  logo: logoWS,
};

export default function Icon({
  name,
  size = 24,
  className = "",
  fallback = null,
  ...props
}) {
  const IconComponent = iconRegistry[name];

  // Si l'icône n'existe pas, retourner le fallback ou null
  if (!IconComponent) {
    if (fallback) {
      return fallback;
    }
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
}

// Export du registre pour debugging ou extensions
export { iconRegistry };
