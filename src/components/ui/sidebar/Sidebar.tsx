import { VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { LogoDark, LogoLight } from "../../../assets";
import { useThemeContext } from "../../../config/theme/ThemeContext";
import { BoardsList } from "../boards-list/BoardsList";
import { ThemeSelector } from "../theme-selector/ThemeSelector";
import {
  HideSidebarButton,
  ImageLogoContainer,
  SidebarContainer,
} from "./Sidebar.styles";

export const Sidebar = () => {
  const { mode } = useThemeContext();
  const logoSrc = mode === "light" ? LogoDark : LogoLight;

  return (
    <SidebarContainer>
      <Stack spacing={{ md: 13 }}>
        <ImageLogoContainer src={logoSrc} />
        <BoardsList />
      </Stack>
      <Stack spacing={4} className="sidebar-last-section">
        <Box pl={4}>
          <ThemeSelector />
        </Box>
        <HideSidebarButton pl={4} className="sidebar-custom-item">
          <VisibilityOffOutlined />
          <span>Hide sidebar</span>
        </HideSidebarButton>
      </Stack>
    </SidebarContainer>
  );
};
