import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongo_username=process.env.db_username;
const mongo_password=process.env.db_password;
const mongo_URI=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.czwoub4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const mongoconnection = async()=>{

    try {
       const con = await mongoose.connect(mongo_URI);
        console.log(`Db connected succesully: ${con.connection.host}`);
    }
    catch(error){
        console.log(`error in connecting:${error.message}`)
    }
}

export{mongoconnection}
