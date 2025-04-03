import { Canteen } from "../models/canteenModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const canteenRegister = async (req, res) => {
    const { username, email, password, location } = req.body;
    
    try {
        // Check if user already exists
        const exists = await Canteen.findOne({ email });
        if (exists) {
            return res.status(400).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Please enter a valid email" 
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters long" 
            });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Add new user in database
        const newUser = new Canteen({
            name: username,
            email: email,
            password: hashedPassword,
            location: location
        });

        const user = await newUser.save();
        const canteenToken = createToken(user._id);
        
        res.status(201).json({ 
            success: true, 
            canteenToken,
            username,
            message: "Account created successfully" 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};

const canteenLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await Canteen.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const canteenToken = createToken(user._id);
        res.status(200).json({ 
            success: true, 
            canteenToken,
            username:user.name,
            email:user.email,
            message: "Login successful" 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};


const DisplayCanteen=async(req,res)=>{ 
    try {
        const canteen=await Canteen.find();
       
        if(!canteen){
            return res.status(404).json({success:false,message:"Canteen not found"})
        }

        res.status(200).json({success:true,canteen})

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Server error"})
    }
}



export { canteenLogin, canteenRegister, DisplayCanteen };