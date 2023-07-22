import React from "react";

const Form = ({
  children,
  className,
  onSubmit,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  onSubmit?: () => void;
}) => (
  <form onClick={onSubmit} className={className}>
    {children}
  </form>
);

export default Form;
