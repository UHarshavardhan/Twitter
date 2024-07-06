import { User } from "../models/user.models.js";
import Notification from "../models/notificatio.model.js";
import pkg from 'bcryptjs';
const { compare,genSalt,hash } = pkg;
import { v2 as cloudinary } from "cloudinary";

const profile =async(req,res)=>{
   const {username}=req.params;
   try {
   const user = await User.findOne({username:username}).select("-password");
   if(!user){
    res.status(400).send("user not found");

   }
   }
   catch(err){
    res.status(500).json(err.message);

   }
   

}

const follow=async(req,res)=>{
    const{id}=req.params;

const usertomodify=await User.findById(id);
const currentuser= await User.findById(req.user._id);

if(id===req.user._id.toString()){
    return res.status(400).send("You can't follow yourself");
}

const isfollowing=currentuser.following.includes(id);

if(isfollowing){
    await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
    await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
   return res.status(200).send("sucessfully unfollowed");
}else{

    await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

   res.status(200).send("sucessfully followed");

const newnotification = new Notification(
    {
        type:"follow",
        from:req.user._id,
        to:usertomodify._id
    }
)
await newnotification.save();

return res.status(200).json({message:"sucessfully followed"})

}

}

const suggested = async(req,res)=>{
try{
    let userID=req.user._id;

    const userfollowed = await User.findById(userID).select("following");

    const user =await User.aggregate(
        [{
            $match:{
                _id:{$ne:userID}
            },
     
           
        },
        {$sample:{
            size:10
        }}
        ]
    )

    const filteredUsers = user.filter((users) => !userfollowed.following.includes(users._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
}
catch(err){
    console.log(err.message);
    res.status(500);
}
}


const update = async(req,res)=>{ 

    const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
	let { profileImg, coverImg } = req.body;
    const UserId=req.user._id;

    let user = await User.findById(UserId);
  
     try{
   
     
    if(!newPassword && currentPassword || !currentPassword && newPassword ){
       return res.status(400).json({error:"Please provide both the passwords"});
    }

      if(newPassword && currentPassword){
        const check= await compare(currentPassword,user.password);
        if(!check){
           return res.status(400).json({error:"Password doesnt match "});
        }
        
            const salt= await genSalt(10);
            user.password = await hash(newPassword, salt);
            
        
      }

      if(profileImg){
        if(user.profileImg){
            // 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg
            await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
        }
         
       const uploasresponse =await cloudinary.uploader.upload(profileImg);
       profileImg =uploasresponse.secure_url;
        
      }

      if(coverImg){
        if(user.coverImg){
            // 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg
            await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
        }
         
       const uploasresponse =await cloudinary.uploader.upload(coverImg);
       coverImg =uploasresponse.secure_url;
        
      }


}
catch(err){
    return res.status(500).json(err.message);

}

     user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();
		user.password = null;
        return res.status(200).json(user);
}

export{
    profile,
    suggested,
    update,
    follow,
  

}


