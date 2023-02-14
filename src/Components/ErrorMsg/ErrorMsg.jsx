import React from "react";
import classes from "./ErrorMsg.module.css";

const ErrorMsg = (props) => {
  return (
    <div className={classes.error}>
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorMsg;
