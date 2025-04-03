import express from "express";
import {addFood,listFood,removeFood,canteenFood}from "../controllers/foodController.js";
import upload from "../middlewares/upload.js";
import canteenAuth from "../middlewares/adminAuth.js";

const foodRouter = express.Router();

    
foodRouter.post("/add",canteenAuth,upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/delete",removeFood)
foodRouter.post("/sort",canteenAuth,canteenFood)


export default foodRouter;