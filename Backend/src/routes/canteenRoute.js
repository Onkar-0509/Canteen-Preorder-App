import { Router } from "express";
import { canteenLogin,canteenRegister } from "../controllers/canteenController.js";

const canteenRouter = Router();

canteenRouter.post("/login",canteenLogin);
canteenRouter.post("/register",canteenRegister)

export default canteenRouter