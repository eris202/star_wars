import React from "react";
import propTypes from "prop-types/";

export const Button = ({
  type,
  disabled,
  className,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn-${type} btn ${className ? className : ""}`}
      {...props}
    >
      {loading ? "Loading ..." : <>{children}</>}
    </button>
  );
};

Button.prototype = {
  type: propTypes.string.isRequired,
  loading: propTypes.bool,
};

Button.defaultProps = {
  className: "btn btn-large btn-primary",
  loading: false,
};
