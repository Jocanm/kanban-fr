import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useDarkMode } from "../../shared/hooks";
import { themeSettings } from "./theme";
import { ThemeContext } from "./ThemeContext";

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useDarkMode();

  const colorMode = React.useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode, setMode]
  );

  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
