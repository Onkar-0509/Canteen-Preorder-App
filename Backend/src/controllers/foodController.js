import Food from "../models/foodModel.js";
import fs from "fs/promises"; // Use async file operations
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import cloudinary from "cloudinary";

const addFood = async (req, res) => {
    try {
        const canteenId = req.user?.canteenId;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // Upload image to Cloudinary
        // console.log(req.file.path);
        
        const imageUpload = await uploadOnCloudinary(req.file.path);
        if (!imageUpload || !imageUpload.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }
        const imageUrl = imageUpload.secure_url;

        // Create new food entry
        const food = new Food({
            canteenId: canteenId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl, // Store Cloudinary URL instead of filename
            cloudinary_id: imageUpload.public_id, // Store Cloudinary image ID
        });

        await food.save();
        res.json({ success: true, message: "Food Added Successfully!" });

    } catch (error) {
        console.error("❌ Error in addFood API:", error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};


// Remove food item and delete image from Cloudinary


const removeFood = async (req, res) => {
    try {
        const foodId = req.body.id;
        
        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete image from Cloudinary
        if (food.cloudinary_id) {
            const cloudinaryResponse = await cloudinary.uploader.destroy(food.cloudinary_id);
            if (cloudinaryResponse.result !== "ok") {
                return res.status(500).json({ success: false, message: "Failed to delete image from Cloudinary" });
            }
        }

        // Remove food item from database
        await food.deleteOne();

        res.json({ success: true, message: "Food Removed Successfully!" });

    } catch (error) {
        console.error("❌ Error in removeFood API:", error.message);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};



const listFood = async(req,res)=>{
    try{
        const foods = await Food.find({})
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false , message:"Error"}); 
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