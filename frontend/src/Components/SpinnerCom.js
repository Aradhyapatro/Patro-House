import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerCom = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        color: "#3459e6",
        margin: "auto",
        display: "block",
      }}
    >
      <div className="sr-only">Loading</div>
    </Spinner>
  );
};

export default SpinnerCom;
