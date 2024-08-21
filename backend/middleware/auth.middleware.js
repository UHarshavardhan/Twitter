import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '10d'
  });

  // const isProduction = process.env.NODE_ENV === 'production';

  res.cookie("jwt", token, {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    same_site: "Lax",
    // secure: isProduction
  });
 
};
