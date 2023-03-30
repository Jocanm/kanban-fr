import { PaletteMode } from "@mui/material";
import { ThemeOptions, darken } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CustomScrollBarObject } from "../../shared/css/css.global";

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
        main: mode === "dark" ? "#fff" : "#f0effa",
        dark: mode === "dark" ? "#fff" : "#d8d7f1",
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
            textTransform: "none",
            fontWeight: 700,
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
                    boxShadow: "none",
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
              backgroundColor:
                mode === "dark" ? theme.palette.customGrey.dark : "#fff",
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              mode === "dark" ? theme.palette.customGrey.dark : "#fff",
            backgroundImage: "none",
            boxShadow: "0px .25rem .375rem rgba(54, 78, 126, 0.101545)",
            borderRadius: ".5rem",
          }),
        },
      },
      MuiDialog: {
        defaultProps: {
          keepMounted: false,
        },
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor:
              mode === "dark" ? theme.palette.customGrey.dark : "#fff",
            backgroundImage: "none",
            borderRadius: theme.spacing(2),
            ...CustomScrollBarObject({ theme }),
          }),
          container: {
            backgroundColor: "#0000005",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiInputBase-input": {
              padding: ".6rem .8rem",
              fontSize: "0.875rem",
              "::placeholder": {
                fontSize: "0.875rem",
              },
            },
            ".MuiInputLabel-root": {
              color: theme.palette.customGrey.main,
              "&.Mui-focused": {
                color: theme.palette.primary.main,
              },
              "&.Mui-error": {
                color: theme.palette.error.main,
              },
            },
            "& .MuiOutlinedInput-root": {
              // borderRadius: "1.25rem",
              // ":hover fieldset": {
              //   borderColor: `${theme.palette.customGrey.main}80`,
              // },
              // ":not(.Mui-focused):hover fieldset": {
              // "&.Mui-focused fieldset": {
              // borderColor: `${theme.palette.customGrey.main}80`,
              // },
              ":not(.Mui-focused, .Mui-error):hover fieldset": {
                // borderColor: `${theme.palette.customGrey.main}80`,
                borderColor: theme.palette.primary.main,
              },
              "& fieldset": {
                borderColor: `${theme.palette.customGrey.main}80`,
              },
            },
            // Multiline
            "& .MuiInputBase-root": {
              "&.MuiInputBase-multiline": {
                padding: ".5rem",
              },
            },
          }),
        },
        defaultProps: {
          FormHelperTextProps: {
            variant: "standard",
            error: true,
          },
          InputLabelProps: {
            shrink: true,
          },
        },
      },
      MuiSnackbar: {
        defaultProps: {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
        defaultProps: {
          IconComponent: KeyboardArrowDown,
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: "0",
            color: mode === "light" ? "#40455250" : "#404552",
            zIndex: 1,
            "&::after": {
              content: '""',
              height: 15,
              width: 15,
              zIndex: -1,
              position: "absolute",
            },
            "&.Mui-checked": {
              "&::after": {
                backgroundColor: "white",
              },
            },
          },
        },
      },
    },
    typography: {
      fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
      allVariants: {
        color: mode === "dark" ? "#fff" : "#000",
      },
      subtitle2: {
        color: mode === "dark" ? "#fff" : "#828FA3",
      },
      body2: {
        fontWeight: 500,
      },
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
  };
};
