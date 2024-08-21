import express from "express";
import { getnotification,deleteNotifications } from "../controllers/notification.controllers.js";

const router= express.Router();

router.get("/getnotification",getnotification);
router.post("/deltepost",deleteNotifications);

export default router;


