import { Box, Stack, useMediaQuery } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSelector } from "react-redux/es/exports";
import { NewBoardForm } from "./components/new-board-form/NewBoardForm";
import { ShowSidebarButton } from "./components/show-sidebar-button/ShowSidebarButton";
import { Navbar } from "./components/ui/navbar/Navbar";
import { Sidebar } from "./components/ui/sidebar/Sidebar";
import { If } from "./components/utils";
import { ActiveBoardPage } from "./pages/ActiveBoardPage";
import { selectShowSidebar } from "./redux/reducers/ui/ui.selector";

const MainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.customGrey.darker
      : theme.palette.customGrey.light,
}));

const SidebarContainer = styled(motion.div)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const App = () => {
  const theme = createTheme();
  const showSidebar = useSelector(selectShowSidebar);

  const aboveMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack overflow="hidden">
      <Navbar />
      <Box display="flex" overflow="hidden">
        <If condition={aboveMd}>
          <SidebarContainer
            initial={{ width: "0px" }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            animate={{ width: showSidebar ? "300px" : "0px" }}
          >
            <Sidebar />
          </SidebarContainer>
        </If>
        <MainContainer
          zIndex={2}
          width="100%"
          overflow="auto"
          component="main"
          height={{
            xs: "92vh",
            md: "90vh",
          }}
        >
          <ActiveBoardPage />
        </MainContainer>
        <NewBoardForm />
      </Box>
      <ShowSidebarButton showSidebar={showSidebar} />
    </Stack>
  );
};

export default App;
