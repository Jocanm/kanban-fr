import { VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { BoardsList } from "../boards-list/BoardsList";
import { ThemeSelector } from "../theme-selector/ThemeSelector";
import { HideSidebarButton, SidebarContainer } from "./Sidebar.styles";
import { selectShowSidebar } from "../../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../../redux/store/store";
import { setShowSidebar } from "../../../redux/reducers/ui/ui.reducer";

export const Sidebar = () => {
  const showSidebar = useSelector(selectShowSidebar);

  const dispatch = useAppDispatch();

  const handleHideSidebar = () => {
    dispatch(setShowSidebar(false));
  };

  return (
    <SidebarContainer>
      <BoardsList />
      <Stack spacing={4}>
        <Box pl={4}>
          <ThemeSelector />
        </Box>
        <HideSidebarButton
          pl={4}
          className="sidebar-custom-item"
          onClick={handleHideSidebar}
        >
          <VisibilityOffOutlined />
          <span>Hide sidebar</span>
        </HideSidebarButton>
      </Stack>
    </SidebarContainer>
  );
};
