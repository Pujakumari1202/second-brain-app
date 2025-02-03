import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {JWT_PASSWORD} from "./config";
import { userMiddleware } from "./middleware";
import { ContentModel, UserModel , LinkModel} from "./db";


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
            title: req.body.title,
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


app.get("/api/v1/content", userMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({

        userId: userId

    }).populate("userId", "username")
    console.log(content)

    res.json({
        content
    })
})



app.delete("/api/v1/content",userMiddleware,async   (req,res)=>{
    const contentId=req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })

    res.json({
        message:"Content deleted"
    })


})

app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share=req.body.share;
    if(share){
        const existingLink =await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId

        });

        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return ;

        }
        //@ts-ignore
        const hash=random(10);
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hash
        })

        res.json({
            hash
        })
    }else {
        //@ts-ignore
        await LinkModel.deteteOne({
            //@ts-ignore
            userId:req.userId
        });

        res.json({
            message:"Removed link"
        })
    }

})

app.get("/api/v1/brain/:shareLink",userMiddleware,async(req,res)=>{
    const hash=req.params.shareLink;

    const link=await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message:"Sorry incorrect input"
        })
        return ;
    }

    //UserId
    const content =await ContentModel.find({
        //@ts-ignore
        userId:link.userId

    })

    console.log(link);
    const user =await UserModel.findOne({
        //@ts-ignore
        _id:link.userId
    })

    if(!user){
        res.status(411).json({
            message:"User not found ,error should ideally not happen"
        })
        return;
    }

    res.json({
        username:user.username,
        content:content
    })

    
})


app.listen(3000);