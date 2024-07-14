import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/homepage";
import LoginPage from "./pages/auth/login/login";
import SignUpPage from "./pages/auth/signup/signup";

function App() {
return (
    <>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
 </Routes>
    </>
  )
}
export default App
