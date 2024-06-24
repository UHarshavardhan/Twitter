import Express from "express";
import { signin,signup,login } from "../controllers/auth.controllers.js";

const router=Express.Router();


router.post("/signin",signin);
router.post("/signup",signup);
router.post("/login",login);

export default router;



 