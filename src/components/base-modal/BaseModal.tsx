import { Dialog, DialogProps, Stack, StackProps } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { modalsPadding, modalsWidth } from "../../shared/css/css.global";
import { Form } from "../form/Form";

interface Props extends DialogProps {
  children: React.ReactNode;
  contentPadding?: StackProps["p"];
  contentWidth?: StackProps["width"];
  contentSpacing?: StackProps["spacing"];
  contentProps?: StackProps;
  methods?: UseFormReturn<any>;
  onSubmit?: (data: any) => void;
}

export const BaseModal = ({
  children,
  contentProps,
  contentWidth = modalsWidth,
  contentPadding = modalsPadding,
  contentSpacing = 6,
  methods,
  onSubmit,
  ...rest
}: Props) => {
  const formProps = methods ? { methods, component: Form, onSubmit } : {};

  return (
    <Dialog {...rest}>
      <Stack
        p={contentPadding}
        width={contentWidth}
        spacing={contentSpacing}
        {...formProps}
        {...contentProps}
      >
        {children}
      </Stack>
    </Dialog>
  );
};
