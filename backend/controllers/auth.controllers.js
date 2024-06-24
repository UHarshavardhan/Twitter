import { User, validateuser } from "../models/user.models"


const signup=async(req,res)=>{
    
   let email=await User.findOne({email:req.body.email});

   if(email){
    res.staus(401).send("Email already registered")
   }

    const {error}=validateuser(req.body);
    if(error){
        res.send(400).send(`Invalid ${error}`);
    }
  
  
}

const login=async(req,res)=>{
   const {email,password}=req.body

   let mail=User.findOne({email});
  if(!mail){
    res.status(402).send("User not registered")
  }

}

    
export{
    signin,
    signup,
    login
}