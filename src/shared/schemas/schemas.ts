import * as yup from "yup";

export const stringRequired = yup
  .string()
  .required("Este campo es requerido")
  .trim();

export const stringOptional = yup.string().trim();

export const stringRequiredEmail = yup;
stringRequired.matches(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  "El email no es válido"
);
