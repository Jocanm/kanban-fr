import { ErrorMessage } from "@hookform/error-message";
import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, useFormState } from "react-hook-form";

type MyInputProps = TextFieldProps & {
  name: string;
};

export const MyInput = ({ name, ...rest }: MyInputProps) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });

  return (
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
};
