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

const updateUser = asycHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password && req.body.password !== "") {
      user.password = req.body.password;
    }
    const new_user = await user.save();

    res.json({
      id: new_user._id,
      name: new_user.name,
      email: new_user.email,
      isAdmin: new_user.isAdmin,
      Token: Genarate(new_user._id),
    });
  } else {
    console.log("USer error");
    res.status(400);
    throw new Error("No such user");
  }
});

const userProfile = (req, res) => {
  res.json(req.user);
};

export { getUser, userProfile, registerUser, updateUser };
