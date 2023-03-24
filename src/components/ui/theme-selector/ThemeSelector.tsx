import { NightsStay, WbSunny } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { useThemeContext } from "../../../config/theme/ThemeContext";
import { ThemeSwitchContainer } from "./ThemeSelector.styles";

export const ThemeSelector = () => {
  const { mode, toggleMode } = useThemeContext();

  return (
    <ThemeSwitchContainer>
      <WbSunny />
      <Switch checked={mode === "dark"} onChange={toggleMode} />
      <NightsStay />
    </ThemeSwitchContainer>
  );
};
