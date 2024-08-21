import express from "express";
import { protectroute } from "../middleware/auth2.middleware.js";
import { getUserPosts,getallpost,following,createpost,likeunlike,Comment,deletepost } from "../controllers/post.controllers.js";

const router=express.Router();
router.get("/all",protectroute,getallpost)
router.get("/following",protectroute,following);
router.get("/user/:username", getUserPosts);
router.post("/create",createpost);
router.post("/like/:id",likeunlike);
router.post("comment/:id",Comment);
router.post("/:id", deletepost);

export default router;
