import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Provider } from "react-redux";
import { NewBoardForm } from "./components/new-board-form/NewBoardForm";
import { Navbar } from "./components/ui/navbar/Navbar";
import { Sidebar } from "./components/ui/sidebar/Sidebar";
import { ThemeContextProvider } from "./config/theme/ThemeContextProvider";
import { ActiveBoardPage } from "./pages/ActiveBoardPage";
import { store } from "./redux/store/store";

const MainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.customGrey.darker
      : theme.palette.customGrey.light,
}));

const App = () => (
  <ThemeContextProvider>
    <Provider store={store}>
      <Stack overflow="hidden">
        <Navbar />
        <Box display="flex" overflow="hidden">
          <Box display={{ xs: "none", md: "block" }}>
            <Sidebar />
          </Box>
          <MainContainer
            component="main"
            overflow="auto"
            width="100%"
            height={{
              xs: "92vh",
              md: "90vh",
            }}
          >
            <ActiveBoardPage />
          </MainContainer>
          <NewBoardForm />
        </Box>
      </Stack>
    </Provider>
  </ThemeContextProvider>
);

export default App;
