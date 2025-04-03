import Food from "../models/foodModel.js";
import fs from "fs";

const addFood = async(req,res)=>{

    const canteenId = req.user?.canteenId;  
    
    let image_filename = `${req.file.filename}`;

    const food = new Food({
        canteenId : canteenId,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category, 
        image : image_filename
    })
   
    try{
        await food.save();
        res.json({success:true,message : "food Added"});

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
   
   const listFood = async(req,res)=>{
        try{
            const foods = await Food.find({})
            res.json({success:true,data:foods})
        }catch(error){
            console.log(error);
            res.json({success:false , message:"Error"}); 
        }
   }
    
// Remove food item
const removeFood = async(req,res)=>{
    try{
        const food = await Food.findById(req.body.id)
        // console.log(food)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await Food.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    }catch(error){
        // console.log(error);
        res.json({success:false,message:"Error"})
    }
}



const canteenFood = async(req,res)=>{
    const canteenId = req.user?.canteenId;  // Extract canteenId from the decoded JWT

    if (!canteenId) {
        return res.status(400).json({ success: false, message: "Canteen ID not found in token." });
    }

    try {
        // Fetch foods based on canteenId
        const foods = await Food.find({ canteenId });

        if (foods.length === 0) {
            return res.json({ success: true, message: "No food items available." });
        }

        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching food items." });
    }
}

export {addFood,listFood,removeFood,canteenFood}