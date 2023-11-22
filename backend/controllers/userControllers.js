import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../helpers/authHelper.js";
import UserModel from "../models/UserModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    //existing user checking
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered, Please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    await new UserModel({
      name,
      email,
      password: hashedPassword,
      pic,
    }).save();

    res.status(200).json({
      success: true,
      message: "Register successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while register",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not registered",
      });
    }

    //matching the password
    const match = await comparePassword(password, user?.password);
    if (!match) {
      return res.status(500).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = generateToken(user?._id);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user?.name,
        email: user?.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while login",
    });
  }
};

// /api/v1/user?search=abhay
export const allUsersController = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await UserModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
