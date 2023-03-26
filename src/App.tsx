import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Provider } from "react-redux";
import { NewBoardForm } from "./components/new-board-form/NewBoardForm";
import { Navbar } from "./components/ui/navbar/Navbar";
import { Sidebar } from "./components/ui/sidebar/Sidebar";
import { ThemeContextProvider } from "./config/theme/ThemeContextProvider";
import { ActiveBoardPage } from "./pages/ActiveBoardPage";
import { store } from "./redux/store/store";

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.customGrey.darker
      : theme.palette.customGrey.light,
  flexGrow: 1,
  borderTop: `1px solid ${
    theme.palette.mode === "dark" ? "#fff2" : theme.palette.lines.light
  }`,
}));

const App = () => (
  <ThemeContextProvider>
    <Provider store={store}>
      <Box height="100vh" display="flex">
        <Box display={{ xs: "none", md: "block" }}>
          <Sidebar />
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Navbar />
          <MainContainer component="main" overflow="auto">
            <ActiveBoardPage />
          </MainContainer>
        </Box>
        <NewBoardForm />
      </Box>
    </Provider>
  </ThemeContextProvider>
);

export default App;
