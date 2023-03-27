import { styled } from "@mui/material/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isActive?: boolean;
};

export const BoardItem = styled((props: Props) => (
  <div {...props}>{props.children}</div>
))(({ theme: { palette, spacing }, isActive }) => ({
  fontWeight: 700,
  paddingLeft: spacing(6),
  color: palette.customGrey.main,
  display: "flex",
  alignItems: "center",
  gap: spacing(3),
  cursor: "pointer",
  "& span": {
    flex: 1,
    wordBreak: "break-word",
  },
  "& svg": {
    fill: palette.customGrey.main,
  },
  "&:hover": isActive || {
    color: palette.primary.main,
    backgroundColor: palette.customGrey.light,
    "& svg": {
      fill: palette.primary.main,
    },
  },
  ...(isActive && {
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
