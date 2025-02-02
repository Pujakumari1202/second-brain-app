import mongoose,{model , Schema} from "mongoose";


mongoose.connect("MONGODB_URI");

//User Schema
const UserSchema =new Schema ({
    username:{type :String, unique:true},
        password:String
})

//User Model

export const UserModel = model("User", UserSchema);