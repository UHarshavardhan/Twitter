import express from "express";
import { getnotification,deleteNotifications } from "../controllers/notification.controllers";

const router= express.Router();

router.get("/getnotification",getnotification);
router.post("/deltepost",deletepost);

export default router;


