import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SidebarContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  display: "flex",
  width: "16.25rem",
  flexDirection: "column",
  spacing: theme.spacing(4),
  justifyContent: "space-between",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  paddingRight: theme.spacing(5),
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.customGrey.dark : "#fff",
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
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: "0 6.25rem 6.25rem 0",
    letterSpacing: ".0313rem",
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
