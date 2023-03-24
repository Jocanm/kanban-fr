import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "16.3rem",
  height: "100%",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.customGrey.dark : "#fff",
  padding: theme.spacing(6, 0),
  paddingRight: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.up("lg")]: {
    width: "18.75rem",
  },
  [theme.breakpoints.up("md")]: {
    borderRight: `.5px solid ${
      theme.palette.mode === "dark" ? "#fff2" : theme.palette.lines.light
    }`,
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(4),
  },
  ".sidebar-custom-item": {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: "0 6.25rem 6.25rem 0",
  },
}));

export const ImageLogoContainer = styled("img")(({ theme }) => ({
  width: "9.5rem",
  height: "auto",
  objectFit: "contain",
  display: "none",
  paddingLeft: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export const HideSidebarButton = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2.5),
  cursor: "pointer",
  color: theme.palette.customGrey.main,
  fontWeight: 700,
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.customGrey.light,
  },
}));
