import { Express } from "express";
import { protectroute } from "../middleware/auth2.middleware.js";

const Router=express.router();
Router.get("/all",protectroute,getallpost)
Router.get("/following",protectroute,getfollowingpost);
// Router.get("/liked/:id",protectroute,getlikepost);
// Router.get("/user/:username", protectroute, getUserPosts);
// Router.post("/create",protectroute,createpost);
// Router.post("/like/:id",protectroute,likeunlike);
// Router.post("comment/:id",protectroute,commnet);
// Router.post("/:id",protectroute, deletepost);

export default Router;
