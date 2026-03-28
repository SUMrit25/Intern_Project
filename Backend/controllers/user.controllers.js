import dotenv from "dotenv"
import crypto from "crypto"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email ||!name){
        res.status(400).json({
            message: "All fields are mandatory"
        })
        
    }

    const token = crypto.randomBytes(16).toString('hex')
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const user = await User.create({
            name, 
            email,
            password
        })
        if(!user){
            return res.status(400).json({message: "Couldnot create user"})
        }
        user.verificationToken = token
        await user.save()

        return res.status(201).json({
            message: "User created successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

const login = async(req, res)=>{
    try {
        const {email, password} = req.body
    
        if(!email || !password){
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        const user = await User.findOne({email})
    
        if(!user){
            return res.status(400).json({
                message: "Email or password is incorrect"
            })
        }
    
        const isPassCorrrect = await bcrypt.compare(password, user.password)
        if(isPassCorrrect){
            const token = await jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET);
            const cookieOptions = {
                httpOnly: true,        
                secure: true,          
                sameSite: "None",    
                maxAge: 24 * 60 * 60 * 1000 
            };
            return res.status(200).cookie("token", token,cookieOptions).json({
                message: "Loggedin successfully"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

const logout = async(req, res)=>{
    try {
            res.clearCookie("token");
            res.status(200).json({message: "User Logged out Successfully"})
    } catch (error) {
        return res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

const getMe = async(req, res)=>{
    try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export {register, login, logout, getMe}