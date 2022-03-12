import bcryptjs from "bcryptjs";

const user = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcryptjs.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "arya",
    email: "arya@gmail.com",
    password: bcryptjs.hashSync("123456", 12),
  },
  {
    name: "vasu",
    email: "avasu@gmail.com",
    password: bcryptjs.hashSync("123456", 12),
  },
];

export default user;
