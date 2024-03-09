//import { useSelector } from "react-redux"
import Main from "./pages/Main";
import "./index.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import axios from "axios";
import PublicRoutes from "./components/PublicRoutes";
import { useEffect } from "react";
import { getTokenExpirationDate } from "../utils/getTokenExpirationDate";
import { refreshToken } from "./api/API";
import ActivateAccount from "./pages/activate-account/ActivateAccount";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = localStorage.getItem("refreshToken");

    //renouveler le token grace a refresh
    const token = localStorage.getItem("token");
    if (refresh && token) {
      const tokenExpirationDate: number = getTokenExpirationDate(token);
      const now = new Date().getTime() / 1000;
      const timeLeft = tokenExpirationDate - now;
      const fiveMinutesBeforeExpiration = 5 * 60; //300secondes => 5minutes

      if (timeLeft <= fiveMinutesBeforeExpiration) {
        refreshToken("/auth/refresh-token", refresh)
          .then((data) => {
            console.log(data.accessToken);
            localStorage.setItem("token", data.accessToken);
          })
          .catch((error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            console.error("error: " + error);
          });
      } else {
        const delayBeforRefresh =
          (tokenExpirationDate - fiveMinutesBeforeExpiration) * 1000;

        const timeOutId = setTimeout(() => {
          refreshToken("/auth/refresh-token", refresh)
            .then((data) => {
              localStorage.setItem("token", data.accessToken);
            })
            .catch((error) => {
              console.error("error: " + error);
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              navigate("/login");
            });
        }, delayBeforRefresh);
        //Nettoyage
        return () => {
          clearTimeout(timeOutId);
        };
      }
    }
  }, []);

  return (
    <>
      {/*<div onClick={logoutHandler} style={{cursor:"pointer"}}>Logout</div>*/}
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<ActivateAccount />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
