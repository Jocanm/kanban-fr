import { ErrorMessage } from "@hookform/error-message";
import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { useFormContext, useFormState } from "react-hook-form";
import React from "react";

type MyInputProps = TextFieldProps & {
  name: string;
  customLabel?: string;
};

export const MyInput = ({ name, customLabel, ...rest }: MyInputProps) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });

  const textField = (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={
        <ErrorMessage
          name={name}
          errors={errors}
          render={({ message }) => message}
        />
      }
      {...rest}
    />
  );

  const withCustomLabel = (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700}>
        {customLabel}
      </Typography>
      {textField}
    </Stack>
  );

  return customLabel ? withCustomLabel : textField;
};
