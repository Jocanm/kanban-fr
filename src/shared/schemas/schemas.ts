import * as yup from "yup";

export const stringRequired = yup
  .string()
  .required("This filed is required")
  .trim();

export const stringOptional = yup.string().trim();

export const booleanRequired = yup
  .boolean()
  .required("This filed is required")
  .typeError("This filed is required");

export const booleanOptional = yup.boolean();

export const stringRequiredEmail = yup;
stringRequired.matches(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  "Invalid email"
);
