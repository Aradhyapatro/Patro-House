import React from "react";
import { Alert } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

const Message = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
