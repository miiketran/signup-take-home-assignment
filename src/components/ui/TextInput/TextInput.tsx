import React, { ChangeEvent } from "react";
import cx from "classnames";
import css from "./TextInput.module.css";

const TextInput = ({
  label,
  name,
  className,
  type = "text",
  onChange,
  error,
}: {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  error?: string;
}) => {
  return (
    <div className={cx(css.container, className)}>
      <label>{label}</label>
      <input type={type} name={name} onChange={onChange}></input>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextInput;
