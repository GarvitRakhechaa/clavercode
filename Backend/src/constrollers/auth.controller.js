import bcrypt from "bcryptjs"
import { db } from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const register = async (req, res) => {
    const {email, password, name } = req.body  // get data from body

    console.log(email);
    console.log(password);
    console.log(name);
    
    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                error:"User already exists"

            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword);
        
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        console.log(token);
        

        res.cookie("jwt", token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "developement",
            maxAge: 1000 * 60 * 60 * 24 * 7  // 7 Days
        })

        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                role:newUser.role,
                image:newUser.image
            }
        })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error:"Error creating user"
        })
        
    }

}

export const login = async (req, res) => {

    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user) {
            return res.status(401).json({
                error:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                error:"Invaild credientials"
            })
        }

        const token = jwt.sign({id:user.id} , process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "developement",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user:{
                id:user.id,
                email:user.email,
                role:user.role,
                image:user.image
            }
        })

    } catch (error) {
        console.error("Error logging in  user:", error);
        res.status(500).json({
            error:"Error logging in  user"
        })
        
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "developement",
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
        
    }
}

export const check = async (req, res) => {
    try {
        res.status(200).json({
            success:true,
            message:"User authenticated successfully",
            user: req.user
        });
        
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error:"Error checking user"
        })   
    }
}