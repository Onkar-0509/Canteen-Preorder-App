import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://shingadesuraj59:Suraj2005@easyserve.mqbs8xc.mongodb.net/");
        console.log("Database Connection Successfully!!");
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
}

export default connectDB;