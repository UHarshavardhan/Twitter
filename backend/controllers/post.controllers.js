import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notificatio.model.js";
import { User } from "../models/user.models.js";




// Router.get("/all",protectroute,getallpost)
// Router.get("/following",protectroute,getfollowingpost);

const getallpost= async(req,res)=>{
try{
const allpost= await Post.find().sort({createdAt:-1}).populate({
    path:"user",
    select:"-password"
})
.populate({
    path:"comments.user",
    select:"-password"
    
})

  if(!allpost){
    return res.status(200).json([]);
  }
   return res.status(200).json(allpost);
}
catch(err){
    return res.status(500).send({message:err.message});

}
}

const following = async(req,res)=>{
try{
    const userID =req.user._id;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } })
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });


    return res.status(200).json(feedPosts);
     } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

}

// Router.get("/user/:username", protectroute, getUserPosts);
// Router.post("/create",protectroute,createpost);

const getUserPosts= async(req,res)=>{
    const {username}=req.parms
   
    const userid= await User.findOne({username:username}).select("-password");
        
    const getpost = await Post.find(userid._id).populate({
        path:"user",
        select:"-password"

    })
    .populate({
        path:"comment.user",
        select:"-password"
    })

    if(getpost.length===0){
    return res.status(200).json([]);
    }

    res.status(200).json(getpost);
}


const createpost=async(req,res)=>{

    try{
   const {img}=req.body;
   let {text}=req.body;
   const userID=req.user._id;
  
 const user= await User.findById(userID)
 

 if(!user){
   return  res.status(200).send("user not found");

 }

 if(!text && !img){
    return res.send(400).send("text or img is empty ")
 }

 if(img){
    const uploadresposne= await cloudinary.uploader.upload(img);
    img = uploadresposne.secure_url;
}
 const newpost =new Post({
    user:userID,
    img:img,
    text:text

 })

 await newpost.save();
 return res.status(200).send("sucessfully uploaded")

}
catch(err){
      res.status(500).send("internal server error");

}
}


// Router.post("/like/:id",protectroute,likeunlike);
// Router.post("comment/:id",protectroute,commnet);

const likeunlike= async(req,res)=>{
    const {id}=req.parms;
    const userID=req.user._id;
    const user= await User.findById(userID).select("-password");

    if(!user){
          res.status(400).send("user not fount");
    }

  const checkuser= await Post.likes.includes(userID);
try{
  if(checkuser){
    await Post.updateOne({ _id: id }, { $pull: { likes: userID } });
    await User.updateOne({ _id: id }, { $pull: { likedPosts: id } });

    const updatedLikes =  Post.likes.filter((postid) => postid.toString() !== userID.toString());
    res.status(200).json(updatedLikes);
} else {
    Post.likes.push(userID);
    await User.updateOne({ _id: userID }, { $push: { likedPosts: id } });
    await Post.save();

    const notification = new Notification({
        from: userID,
        to: Post.user,
        type: "like",
    });
    await notification.save();

}
}
catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
}
};

const Comment =async(req,res)=>{

    try{
    const {id}=req.params;
    const {text}=req.body;
    const userID=req.user._id;
    const post= await Post.findById(userID)

    if(!post){
          res.status(400).send("post not found");
    }
    if(!text){
        res.status(400).send("Please enter the text");
    }
    
    const comment = { user: userID, text };

    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
    }
 catch (error) {
		console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}




}
// Router.post("/:id",protectroute, deletepost);

const deletepost =async(req,res)=>{

    try{
    const {id}=req.params;
    const userID=req.user._id;
    const post= await Post.findById(userID)

    if(!post){
          res.status(400).send("post not fount");
    }
   if(userID===id){
    res.status(400).send("you are not alllowed to delete the post")
   }

    if (post.img) {
        const imgId = post.img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
    }
     
    const remove =await Post.findByIdAndDelete(id);

    res.status(200).send("post deleted successfully");

    }

    catch(err){
        res.status(500).send("intenal server error")

    }
}

export {
    deletepost,
    getUserPosts,
    getallpost,
    createpost,
    Comment,
    likeunlike,
    following

}