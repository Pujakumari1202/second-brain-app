import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {UserModel} from "./db";

const JWT_PASSWORD="123456";

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



app.post("/api/v1/content",(req,res)=>{
    

})


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