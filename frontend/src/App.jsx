import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Homepage";
import LoginPage from "./pages/auth/login/login";
import SignUpPage from "./pages/auth/signup/signup";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/RightPanel";
import {Toaster} from 'react-hot-toast';

function App() {
return (
<div className='flex max-w-6xl mx-auto'>
    <Sidebar/>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
 </Routes>
 <RightPanel/>
 <Toaster/>

</div>
  )
}
export default App
