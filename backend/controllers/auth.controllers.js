import { response } from "express";
import { User, validateuser } from "../models/user.models.js";
import lodash from "lodash";
import pkg from 'bcryptjs';
import { generateTokenAndSetCookie } from "../middleware/auth.middleware.js";

const { compare, genSalt, hash } = pkg;

const signup = async (req, res) => {
    const { error } = validateuser(req.body);
    if (error) {
        return res.status(400).send(`Invalid ${error}`);
    }

    let email = await User.findOne({email:req.body.email });
    if (email) {
        return res.status(401).send("Email already registered");
    }

    const salt = await genSalt(10);
    const hashedvalue = await hash(req.body.password, salt); // Hash the user's password
    const number = Math.floor(Math.random() * 1000); // Fixed random number generation

    try {
        const user = new User({
            ...req.body,
            password: hashedvalue,
            username: `${req.body.username}_${number}`
        });

        await user.save(); 
       
       
        generateTokenAndSetCookie(user._id, res);
             console.log("function invocker")

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log({password});

    let user = await User.findOne({ email: email }); 

    const isPasswordCorrect = await compare(password, user?.password || ""); 

    if (!user || !isPasswordCorrect) {
        return res.status(400).json({message:"Invalid email or password"});
    }

    generateTokenAndSetCookie(user._id, res); 


    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
    });
  
};

const logout =async(req,res)=>{
  try{
     res.cookie("jwt","",{maxage:0});
     res.send(200).send("sucessfully logged out");

  }
catch(error){
  return res.status(500).send(error.message);
}
}

const getme= async(req,res)=>{
  try{
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  }
  catch(error){
    console.log("getme");
    return res.status(500).send(error.message);
  }
}

export {
    signup,
    login,
    logout,
    getme
};
