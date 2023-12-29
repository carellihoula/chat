import { useSelector } from "react-redux"
import Main from "./pages/Main"
//import Login from "./pages/login/Login"
import { RootState } from "./redux/store"
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";

function App() {

  const token = useSelector((state: RootState ) => state.islogged.token)
  //console.log(token)
  //console.log(localStorage.getItem('token'))
 const logoutHandler = () => {
    axios.post('http://localhost:9784/auth/logout',{withCredentials:true})
    .then((res)=>{
      localStorage.removeItem('token');
      window.location.href="/login"
    })
 }

  return (<>
  
    <div onClick={logoutHandler} style={{cursor:"pointer"}}>Logout</div>
   <Routes>
      
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
      </Route>
      
      
   </Routes>
  </>
    
  )
}
export default App;



