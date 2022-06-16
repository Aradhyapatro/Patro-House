import jwt from "jsonwebtoken";

const Generate = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: "2D",
  });
};

export default Generate;
