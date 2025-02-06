import {Input} from "../components/Input";
import {Button} from "../components/Button";
export function Signin(){
    return <div className="h-screen w-screen bg-gray-200  flex justify-center items-center ">
        <div className="bg-white rounded-xl  min-w-48 p-8 border border-gray-300">
            <Input placeholder="Username" />
            <Input placeholder="Password" />

            <div className="flex justify-center pt-4 ">
            <Button loading={false} variant="primary" text="Signup" fullWidth={true}/>   
                
            </div> 
        </div>
    </div>
}