import express from "express";
import authroutes from "./Routes/auth.routes.js";
import { mongoconnection } from "./db/mongo.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userroutes from "./Routes/user.route.js";
import { v2 as cloudinary } from "cloudinary";
import postroutes from "./Routes/post.routes.js";
import notification from "./Routes/notification.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.port;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET
});

const corsOptions = {
  exposedHeaders: ["x-auth-token", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/post", postroutes);
app.use("/api", authroutes);
app.use("/api/user", userroutes);
app.use("/api/notification", notification);

console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  mongoconnection();
});
