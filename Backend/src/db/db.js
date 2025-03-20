import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/CanteenGo");
        console.log("Database Connection Successfully!!");
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
}

export default connectDB;