import { styled } from "@mui/material/styles";

export const ThemeSwitchContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  borderRadius: "0.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.customGrey.darker
      : theme.palette.customGrey.light,
  " svg": {
    color: theme.palette.customGrey.main,
  },
}));
