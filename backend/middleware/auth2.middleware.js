import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const protectroute = async (req, res, next) => {
  try {

    let token = req.cookies; 

    if (!token) {
      console.log("Token not found:", token);
      return res.status(401).send("Please log in.");
    }

    const authentication = jwt.verify(token, process.env.JWT_SECRET);

    if (!authentication) {
      return res.status(401).send("Unauthorized user.");
    }

    const user = await User.findById(authentication.userId).select("-password");

    if (!user) {
      return res.status(404).send("User not found.");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Authentication error:", err);
    return res.status(500).send("Internal server error.");
  }
};
