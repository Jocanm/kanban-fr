import React from "react";
import { PaletteMode } from "@mui/material";

export const useDarkMode = () => {
  const [theme, setTheme] = React.useState<PaletteMode>(
    (window.localStorage.getItem("theme") as PaletteMode) || "light"
  );

  React.useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem(
      "theme"
    ) as PaletteMode | null;
    localTheme && setTheme(localTheme);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme] as const;
};
