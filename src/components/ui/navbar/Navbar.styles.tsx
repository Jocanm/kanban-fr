import { styled } from "@mui/material/styles";
import { Toolbar, ToolbarProps, Typography, Stack } from "@mui/material";

interface BaseProps {
  showSidebar: boolean;
}

export const CustomImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const ImageLogoContainer = styled("div")<BaseProps>(
  ({ theme, showSidebar }) => ({
    display: "none",
    alignItems: "center",
    minWidth: "16.3rem",
    paddingLeft: theme.spacing(6),
    borderRight: `${showSidebar ? "1px" : 0} solid ${
      theme.palette.mode === "dark" ? "#fff2" : theme.palette.lines.light
    }`,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      height: 96,
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "18.75rem",
    },
  })
);

interface CustomToolbarProps extends ToolbarProps, BaseProps {
  children: React.ReactNode;
}

export const CustomToolbar = styled((props: CustomToolbarProps) => (
  <Toolbar disableGutters {...props}>
    {props.children}
  </Toolbar>
))(({ theme, showSidebar }) => ({
  height: "8vh",
  borderBottom: `${showSidebar ? 0 : "1px"} solid ${
    theme.palette.mode === "dark" ? "#fff2" : theme.palette.lines.light
  }`,
  [theme.breakpoints.up("md")]: {
    height: "10vh",
  },
}));

export const ActiveBoardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textOverflow: "ellipsis",
  overflow: "hidden",
  width: "100%",
  maxWidth: "8rem",
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "16rem",
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "25rem",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "40rem",
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: "60rem",
  },
}));

export const BaseNavContainer = styled(Stack)<BaseProps>(
  ({ theme, showSidebar }) => ({
    padding: theme.spacing(0, 4),
    height: "100%",
    width: "100%",
    borderBottom: `${showSidebar ? "1px" : "0"} solid ${
      theme.palette.mode === "dark" ? "#fff2" : theme.palette.lines.light
    }`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  })
);
