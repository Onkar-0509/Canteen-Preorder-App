import { Canteen } from "../models/canteenModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const canteenRegister =async(req,res)=>{
    const {name,email,password}=req.body
            try{
                //checking is user already exists
                const exists = await Canteen.findOne({email})
                if(exists){
                    return res.json({success:false, message:"user already exists"})
                }
    
                // validating email format & strong password
                if(!validator.isEmail(email)){
                    return res.json({success:false,message:"Please enter a valid email"})
                }
    
                if(password.length<8){
                    return res.json({success:false, message:"Please enter a strong Password include uppercase,lowercase,special char(@,#,$,%,&) and number"})
                }
    
                //hashing user password 
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password,salt)
    
                //Add new user in database
                const newUser = new Canteen({
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



const canteenLogin = async(req,res)=>{
    const {email,password} = req.body
    
            try{
                const user = await Canteen.findOne({email})
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

export {canteenLogin,canteenRegister}