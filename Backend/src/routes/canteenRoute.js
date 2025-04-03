import { Router } from "express";
import { canteenLogin,canteenRegister,DisplayCanteen} from "../controllers/canteenController.js";
import authMiddleware from "../middlewares/adminAuth.js";
const canteenRouter = Router();

canteenRouter.post("/login",canteenLogin);
canteenRouter.post("/register",canteenRegister)
canteenRouter.get("/display-canteen",DisplayCanteen);

export default canteenRouter