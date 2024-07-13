import  express  from "express";
import authroutes from "./Routes/auth.routes.js";
import { mongoconnection } from "./db/mongo.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userroutes from "./Routes/user.route.js"
import { v2 as cloudinary } from "cloudinary";
import postroutes from "./Routes/post.routes.js"
import notification  from "./Routes/notification.routes.js"


dotenv.config()
const app=express();
const port =process.env.port;

cloudinary.config({ 
      cloud_name: process.env.Cloud_name, 
      api_key: process.env.Cloud_key, 
      api_secret: process.env.Cloud_secret
  });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use("/api/post",postroutes);
app.use("/auth/api",authroutes);
app.use("/api/user",userroutes);
app.use("/api/notification",notification);
console.log(process.env.mongo_uri);
app.get("/",(req,res)=>{
      res.send("welcome");
})

app.listen(port,()=>{
console.log(`listening to ${port}`);
mongoconnection();

})
