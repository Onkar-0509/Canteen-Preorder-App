import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// create jwt token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET ,{ expiresIn: "7d" })
}

//login user
const loginUser = async(req,res)=>{
        const {email,password} = req.body

        try{
            const user = await User.findOne({email})
            if(!user){
                return res.json({success:false,message:"User Doesn't Exist"})
            }
            const isMatch= await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.json({success:false,message:"Invalid Credentials"})
            }

            const token = createToken(user._id);
            res.json({success:true,token}) 
        }
        catch(error){
            console.log(error);
            res.json({success:false, message:"Error"})
        }
}



//Register user
const registerUser = async(req,res)=>{
        const {name,email,password}=req.body
        try{
            //checking is user already exists
            const exists = await User.findOne({email})
            if(exists){
                return res.json({success:false, message:"user already exists"})
            }

            // validating email format & strong password
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"Please enter a valid email"})
            }

            if(password.length<8){
                return res.json({success:false, message:"Please enter a strong password" })
            }

            //hashing user password 
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)

            //Add new user in database
            const newUser = new User({
                name:name,
                email:email,
                password:hashedPassword
            })

            const user = await newUser.save();
            const token = createToken(user._id);
            res.json({success:true,token})


        }catch(err){
            console.log(err);
            res.json({success:false,message:"Error"})
        }
}

export {loginUser,registerUser}