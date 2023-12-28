import { useSelector } from "react-redux"
import Main from "./pages/Main"
//import Login from "./pages/login/Login"
import { RootState } from "./redux/store"
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {

  const isAuthenticated = useSelector((state: RootState ) => state.islogged.isloggedIn)
  return (
   <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/register" element={<Register />} />
   </Routes>
  )
}
export default App;



