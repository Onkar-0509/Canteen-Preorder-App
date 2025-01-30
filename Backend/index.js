import express from "express";
import cors from "cors";
import connectDB from "./src/db/db.js";
import foodRouter from "./src/routes/foodroute.js";

const app = express();
const port = 3000;

app.use(cors());         // access the backend from frontend
app.use(express.json());  // parse the json request

// database connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("Suraj Shinagade");
})

app.listen(port ,()=>{
    console.log(`Server running on port ${port}`);
})

