import React from "react";
import { Alert } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

const Message = ({ variant, message, concat }) => {
  return (
    <Alert
      variant={variant}
      style={{ width: "95%", display: "block", margin: "0 auto" }}
    >
      {message} {concat}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
