import  Express from "express";

import { protectroute } from "../middleware/auth2.middleware.js";
import { suggested,follow,profile,update } from "../controllers/user.controllers.js";

const router= Express.Router();

router.get("/profie/:username",protectroute,profile);
router.get("/suggested",protectroute,suggested);
router.post("/follow/:id",protectroute,follow);
router.post("/update",protectroute,update);

export default router;