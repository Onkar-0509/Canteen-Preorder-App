import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

        userId : {
            type:String,
            required:true
        },
        canteenId:{
            type:String,
            required:true
        },
        items : {
            type:Array,
            required:true
        },
        amount : {
            type:Number,
            
        },
        address : {
            type:Object,
        
        },
        status: {
            type:String,
            default:"Order Processing"
        },
        date : {
            type:Date,
            default:Date.now()
        },
        payment: {
            type:Boolean,
            default:false
        },
        timeSlot:{
            type:String,
            required:true
        }
},{timestamps:true,minimize:false})


export const Order = mongoose.model("Order",orderSchema);