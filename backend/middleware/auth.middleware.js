import Jwt from "jsonwebtoken";
import dotenv from "dotenv";



export const generateTokenAndSetCookie = (userId, res) => {
    const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });

    res.cookie("Jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });
};
