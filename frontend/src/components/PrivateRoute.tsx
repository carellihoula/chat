import { Navigate, Outlet } from "react-router-dom";
//import { isTokenExpired } from "../../utils/isTokenExpired";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  console.log("carel : " + token);
  return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
