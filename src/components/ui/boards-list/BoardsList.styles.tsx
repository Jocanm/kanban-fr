import { styled } from "@mui/material/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
};

export const BoardItem = styled((props: Props) => (
  <div {...props}>{props.children}</div>
))(({ theme: { palette, spacing }, active }) => ({
  fontWeight: 700,
  paddingLeft: spacing(6),
  color: palette.customGrey.main,
  display: "flex",
  alignItems: "center",
  gap: spacing(3),
  cursor: "pointer",
  "& svg": {
    fill: palette.customGrey.main,
  },
  "&:hover": {
    color: "#fff",
    backgroundColor: palette.primary.main,
    "& svg": {
      fill: "#fff",
    },
  },
  ...(active && {
    color: "#fff",
    backgroundColor: palette.primary.main,
    "& svg": {
      fill: "#fff",
    },
  }),
}));

export const CreateBoardItem = styled(BoardItem)(({ theme: { palette } }) => ({
  color: palette.primary.main,
  "& svg": {
    fill: palette.primary.main,
  },
  "&:hover": {
    backgroundColor: palette.customGrey.light,
    color: palette.primary.main,
    "& svg": {
      fill: palette.primary.main,
    },
  },
}));
