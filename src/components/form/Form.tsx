import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<any, unknown>;
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
  className?: string;
}

export const Form = ({ methods, className, onSubmit, children }: Props) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={`base-form ${className}`}>
        {children}
      </form>
    </FormProvider>
  );
};
