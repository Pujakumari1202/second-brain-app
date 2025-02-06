import {Input} from "../components/Input";
import {Button} from "../components/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";


export function Signup(){
     const usernameRef=useRef<HTMLInputElement>();
     const passwordRef=useRef<HTMLInputElement>();

    async function signup(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        //fetch the data from backend
        await axios.post(BACKEND_URL + "api/v1/signup",{
            data:{
                username,
                password
            }
        })
        alert("Signup Successful");
     }

    return <div className="h-screen w-screen bg-gray-200  flex justify-center items-center ">
        <div className="bg-white rounded-xl  min-w-48 p-8 border border-gray-300">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center pt-4 ">
            <Button loading={false} variant="primary" text="Signup" fullWidth={true}/>   
                
            </div> 
        </div>
    </div>
}