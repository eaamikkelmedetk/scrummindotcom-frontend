import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./inputfield.style.css";

const inputField = ({
  input,
  label,
  type,
  className,
  tooltip,
  validationErrorClass,
  autoComplete,
  placeholder,
  meta: { touched, dirty, error, warning, invalid }
}) => {
  return (
    <div className="inputContainer">
      <input
        {...input}
        className={classNames(
          { [validationErrorClass]: dirty && error },
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
      />
      {tooltip && (
        <div
          className={classNames("tooltip", {
            "tooltip--show": touched && error
          })}>
          <span
            className={classNames("tooltiptext", {
              "tooltip--show": touched && error
            })}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

inputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  validationErrorClass: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string
};

export default inputField;
