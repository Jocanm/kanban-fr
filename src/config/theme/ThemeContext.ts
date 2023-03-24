import { PaletteMode } from "@mui/material";
import React from "react";

export interface ThemeContextProps {
  mode: PaletteMode;
  toggleMode: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

export const useThemeContext = () => React.useContext(ThemeContext);
