import { User, validateuser } from "../models/user.models";
import lodash from "lodash";


const signup=async(req,res)=>{
    
   let email=await User.findOne({email:req.body.email});
   if(email){
    res.staus(401).send("Email already registered")
   }

    const {error}=validateuser(req.body);
    if(error){
        res.send(400).send(`Invalid ${error}`);
    }
  const salt = await bycrypt.gensalt(10);
  const hashedvalue= await bycrypt.hash(req.body.password,salt);
  const number=Math.floor(Math.number*1000)

try{
    const user=new user({
        ...req.body,
        password:hashedvalue,
        username:`req.body.fullname_${number}`
    })

}
catch(error){
res.send(error.message);
}

}
const login=async(req,res)=>{
   const {email,password}=req.body

   let mail=User.findOne({email:email});
  if(!mail){
    res.status(402).send("User not registered")
  }

}

    
export{
    signin,
    signup,
    login
}