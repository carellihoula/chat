//import { useSelector } from "react-redux"
import Main from "./pages/Main"
//import Login from "./pages/login/Login"
//import { RootState } from "./redux/store"
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import PublicRoutes from "./components/PublicRoutes";

function App() {

  //const token = useSelector((state: RootState ) => state.islogged.token)
  //console.log(token)
  //console.log(localStorage.getItem('token'))
 const logoutHandler = () => {
    axios.post('http://localhost:9784/auth/logout',{withCredentials:true})
    .then(_=>{
      localStorage.removeItem('token');
      window.location.href="/login"
    })
 }
 //const isOnline = navigator.onLine;
  return (<>
  
    <div onClick={logoutHandler} style={{cursor:"pointer"}}>Logout</div>
   <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
      </Route>
      
      
   </Routes>
  </>
    
  )
}
export default App;



