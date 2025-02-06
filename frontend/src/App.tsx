import { Dashboard } from "./pages/dashboard"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BrowserRouter , Routes, Route } from "react-router-dom";


function App() {
  
  return <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
}
export default App
