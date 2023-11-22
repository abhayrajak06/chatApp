import Jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const isLoggedIn = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "User not authorized",
    });
  }
};
