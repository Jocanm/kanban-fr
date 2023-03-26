import { Theme } from "@mui/material";
import { css } from "@mui/material/styles";

export const CustomScrollBar = (theme: Theme) => css`
  ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.lines.main};
    border-radius: 1.25rem;
    width: 0.625rem;
    height: 1.25rem;
  }
`;

interface CustomScrollBarObjectProps {
  theme: Theme;
  hidden?: boolean;
}

export const CustomScrollBarObject = ({
  theme,
  hidden,
}: CustomScrollBarObjectProps) => ({
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5rem",
    ...(hidden && {
      display: "none",
    }),
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.lines.main,
    borderRadius: "1.25rem",
    width: ".625rem",
    height: "1.25rem",
  },
});

export const modalsWidth = {
  xs: "80vw",
  sm: "25rem",
  md: "30rem",
};

export const modalsPadding = {
  xs: 6,
  md: 8,
};
