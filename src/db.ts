import mongoose,{model , Schema} from "mongoose";


mongoose.connect("mongodb+srv://SKT9Z1c6Gj5EUq1r:SKT9Z1c6Gj5EUq1r@cluster0.d555e.mongodb.net/second_brain");

//User Schema
const UserSchema =new Schema ({
    username:{type :String, unique:true},
        password:String
})

//User Model

export const UserModel = model("User", UserSchema);


const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    type: String,
    userID:{type:mongoose.Types.ObjectId,ref:'User',required:true},
})


export const ContentModel=model("Content",ContentSchema);

