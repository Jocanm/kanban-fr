import { PaletteMode } from "@mui/material";
import { ThemeOptions, darken } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
    customGrey: Palette["primary"] & {
      darker: string;
    };
    lines: Palette["primary"];
  }
  interface PaletteOptions {
    black: PaletteOptions["primary"];
    customGrey: PaletteOptions["primary"] & {
      darker: string;
    };
    lines: PaletteOptions["primary"];
  }
}

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      primary: {
        dark: darken("#635fc7", 0.2),
        main: "#635fc7",
        light: "#A8A4FF",
        contrastText: "#fff",
      },
      error: {
        dark: darken("#EA5555", 0.2),
        main: "#EA5555",
        light: "#FF9898",
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "dark" ? "#fff" : "#635FC71A",
        dark: mode === "dark" ? "#fff" : "#635FC740",
        contrastText: "#635fc7",
      },
      black: {
        dark: darken("#000112", 0.2),
        main: "#000112",
        contrastText: "#fff",
      },
      customGrey: {
        dark: "#2B2C37",
        main: "#828FA3",
        light: "#F4F7FD",
        darker: "#20212C",
      },
      lines: {
        dark: "#3E3F4E",
        main: "#828FA3",
        light: "#E4EBFA",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderRadius: "1.25rem",
          },
          sizeSmall: {
            padding: "0.5rem 1rem",
            width: "auto",
            minWidth: "auto",
          },
          contained: ({ ownerState, theme }) => ({
            ...(ownerState?.color === "primary"
              ? {
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }
              : {}),
            ...(ownerState?.color === "secondary" && mode === "light"
              ? {
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                    boxShadow: "none",
                  },
                }
              : {}),
            ...(ownerState?.color === "error"
              ? {
                  "&:hover": {
                    backgroundColor: theme.palette.error.light,
                    boxShadow: "none",
                  },
                }
              : {}),
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: "none",
            "& .MuiToolbar-root": {
              minHeight: "64px",
              backgroundColor:
                mode === "dark" ? theme.palette.customGrey.dark : "#fff",
            },
          }),
        },
      },
    },
    typography: {
      fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
      allVariants: {
        color: mode === "dark" ? "#fff" : "#000",
      },
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
  };
};
