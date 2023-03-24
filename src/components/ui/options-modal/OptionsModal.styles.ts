import { styled } from "@mui/material/styles";

export const ModalContainer = styled("div")`
  width: 16.5rem;
  background-color: ${({ theme: { palette } }) =>
    palette.mode === "dark" ? palette.customGrey.dark : "#fff"};
`;
