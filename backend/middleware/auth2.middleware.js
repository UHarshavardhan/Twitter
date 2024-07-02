import { User  } from "../models/user.models.js";
import Jwt from "jsonwebtoken";

export const protectroute =async(req,res,next)=>{

    try{
    const token=req.cookies.Jwt ;
    if(!token){
        return res.status(404).send("Please login");
    }

    const authentication = Jwt.verify(token,process.env.JWT_SECRET);
    if(!authentication){
        return res.status(404).send("unauthorized user");
    }

    const user= await User.findById(authentication.userId).select("-password");
    if(!user){
       return res.status(400).send("not found");
    }
    
    req.user= user;
    next();
}
catch(err){
    console.log("auth2")
    return res.status(500).send(err.message);
}

}