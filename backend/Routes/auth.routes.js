import Express from "express";
import { signup,login,getme,logout } from "../controllers/auth.controllers.js";
import { protectroute } from "../middleware/auth2.middleware.js";

const router=Express.Router();


router.get("/auth",protectroute, getme)
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout)

export default router;



 