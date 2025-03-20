import mongoose from "mongoose";

const canteenSchema = new mongoose.Schema({

     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     }

},{timestamps:true})

export const Canteen = mongoose.model("Canteen",canteenSchema)