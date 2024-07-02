import  express  from "express";
import authroutes from "./Routes/auth.routes.js";
import { mongoconnection } from "./db/mongo.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



dotenv.config()
const app=express();
const port =process.env.port;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use("/auth/api",authroutes);
console.log(process.env.mongo_uri);
app.get("/",(req,res)=>{
      res.send("welcome");
})

app.listen(port,()=>{
console.log(`listening to ${port}`);
mongoconnection();

})
