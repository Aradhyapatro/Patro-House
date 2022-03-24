import Users from "../models/UserModel.js";
import Genarate from "../utils/GenerateToken.js";
import asycHandler from "express-async-handler";

const registerUser = asycHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401);
    throw new Error("Please enter name,email,password");
  }

  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error("User Already Exists");
  }

  const user = await Users.create({ name, email, password });

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      Token: Genarate(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Arya it's not Verified My Friend");
  }
});

const getUser = asycHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.passVerify(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      Token: Genarate(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Arya it's not Verified My Friend");
  }
});

const userProfile = (req, res) => {
  res.send("Hello Profile");
};

export { getUser, userProfile, registerUser };
