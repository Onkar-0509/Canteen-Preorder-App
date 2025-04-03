import express from "express";
import {addFood,listFood,removeFood,canteenFood}from "../controllers/foodController.js";
import multer from "multer";
import canteenAuth from "../middlewares/adminAuth.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",canteenAuth,upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/delete",removeFood)
foodRouter.post("/sort",canteenAuth,canteenFood)


export default foodRouter;