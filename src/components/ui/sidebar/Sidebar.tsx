import { VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { BoardsList } from "../boards-list/BoardsList";
import { ThemeSelector } from "../theme-selector/ThemeSelector";
import { HideSidebarButton, SidebarContainer } from "./Sidebar.styles";

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <BoardsList />
      <Stack spacing={4}>
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
