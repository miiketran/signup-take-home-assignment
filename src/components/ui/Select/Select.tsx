import React, { ChangeEvent } from "react";
import cx from "classnames";
import css from "./Select.module.css";
import { SelectOption } from "../../../utils/formUtils";

const Select = ({
  label,
  name,
  className,
  onChange,
  options,
  isLoading,
  error,
}: {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  isLoading?: boolean;
  type?: string;
  className?: string;
  error?: string;
}) => {
  return (
    <div className={cx(css.container, className)}>
      <label>{label}</label>
      <div className={css.selectWrapper}>
        <select name={name} onChange={onChange}>
          {isLoading ? (
            <option value={undefined}>Loading...</option>
          ) : (
            <>
              {" "}
              <option value={undefined}>Select</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Select;
