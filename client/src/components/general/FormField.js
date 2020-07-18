import React from "react";
import generalStyles from "../../styles/general.module.css";

const FormField = ({
  label,
  placeholder,
  name,
  LeadingIcon,
  onChange = () => {},
}) => {
  return (
    <div className={generalStyles.formField}>
      <label className={generalStyles.formLabel} htmlFor={name}>
        {label}
      </label>
      <div className={generalStyles.formInputContainer}>
        <LeadingIcon className={generalStyles.formLeadingIcon} />
        <input
          className={generalStyles.formInput}
          name={name}
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormField;
