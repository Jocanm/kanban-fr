import { Add } from "@mui/icons-material";
import { Box, CardActionArea, Stack, Typography } from "@mui/material";

export const NewColumnButton = () => (
  <Box
    top="3rem"
    display="flex"
    alignItems="center"
    justifyContent="center"
    minWidth={{ xs: "13rem", md: "17.5rem" }}
    position="relative"
    borderRadius=".375rem"
    height="calc(100% - 3rem)"
    color="customGrey.main"
    sx={(theme) => ({
      cursor: "pointer",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);"
          : "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
    })}
  >
    <CardActionArea sx={{ height: "100%", borderRadius: ".375rem" }}>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Add
          sx={{
            fontSize: {
              xs: "2.5rem",
              md: "2rem",
            },
          }}
        />
        <Typography
          variant="h5"
          fontWeight={600}
          letterSpacing={2}
          color="inherit"
          display={{ xs: "none", md: "block" }}
        >
          New Column
        </Typography>
      </Stack>
    </CardActionArea>
  </Box>
);
