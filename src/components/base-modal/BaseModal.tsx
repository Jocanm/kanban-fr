import { Dialog, DialogProps, Stack, StackProps } from "@mui/material";
import React from "react";
import { modalsPadding, modalsWidth } from "../../shared/css/css.global";

interface Props extends DialogProps {
  children: React.ReactNode;
  contentPadding?: StackProps["p"];
  contentWidth?: StackProps["width"];
  contentSpacing?: StackProps["spacing"];
  contentProps?: StackProps;
}

export const BaseModal = ({
  children,
  contentProps,
  contentWidth = modalsWidth,
  contentPadding = modalsPadding,
  contentSpacing = 8,
  ...rest
}: Props) => {
  return (
    <Dialog {...rest}>
      <Stack
        p={contentPadding}
        width={contentWidth}
        spacing={contentSpacing}
        {...contentProps}
      >
        {children}
      </Stack>
    </Dialog>
  );
};
