import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {JWT_PASSWORD} from "./config";
import { userMiddleware } from "./middleware";
import { ContentModel, UserModel } from "./db";


const app=express();
app.use(express.json());

app.post("/api/v1/signup",async(req,res)=>{
    //Zod validation, hash the password
    const username=req.body.username;
    const password=req.body.password;
    try{
        await UserModel.create({
            username:username,
            password:password
    
        })
        
        res.json({
            message:"User signed up"
        })
        
    }catch(e){
        res.status(411).json({
            message:"User already exists"
        })
    }
})

app.post("/api/v1/signin",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
        username:username,
        password:password
    })

    if(existingUser){
        const token=jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
    }else {
        res.status(401).json({
            message:"Incorrect credentials"
        })
    }


})



// app.post("/api/v1/content", userMiddleware, async (req, res) => {
//     const link = req.body.link;
//     const type = req.body.type;
//     await ContentModel.create({
//         link,
//         type,
//         title: req.body.title,
//         //@ts-ignore
//         userId: req.userId,
//         tags: []
//     })

//     res.json({
//         message: "Content added"
//     })
    
// })
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    
    try {
        await ContentModel.create({
            link,
            type,
            //@ts-ignore
            userID: req.userId,  // Ensure this matches the schema's field name
            tags: []
        });
        res.json({
            message: "Content added"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating content",
            error
        });
    }
});


app.get("/api/v1/content",(req,res)=>{

})

app.delete("/api/v1/content",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{
    
})

// app.get("/api/v1/signup",(req,res)=>{
//     console.log("Hello World")
//     res.send("Hello World11111111")
// })

app.listen(3000);