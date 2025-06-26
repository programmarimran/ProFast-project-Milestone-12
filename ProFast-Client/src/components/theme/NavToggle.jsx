// import useTheme from "../Hooks/useTheme";
// Assuming you have a ToggleButton component

import ToggleButton from "./ToggleButton";
import useTheme from "../../hooks/useTheme";

const NavToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav>
      {/* Option 1: Use the ToggleButton component */}
      <ToggleButton theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
};

export default NavToggle;
