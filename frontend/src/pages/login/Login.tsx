import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField.tsx";
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import SubmitButtonLoginRegister from "../../components/ui/SubmitButtonLoginRegister.tsx";
import bg from "../../assets/images/backgroundWhatsapp.jpeg";
import ButtonAuth2Component from "../../components/ui/ButtonAuth2Component.tsx";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { loginUser } from "../../api/API";

// Define a type for your state
type UserInfos = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  //const [data, setData] = useState(null);
  //const user = useSelector(state:RootState => )

  const [userInfos, setUserInfos] = useState<UserInfos>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser("/auth/login", userInfos);
      //setData(response);
      //console.log(response.bearer);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);

      setUserInfos({
        email: "",
        password: "",
      });

      setLoading(true);
      //attendre 2s avant d'etre redirigé vers la page main
      setTimeout(() => {
        navigate("/main");
      }, 1000);
    } catch (error) {
      console.log("probleme de connexion error: " + error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos((infos) => ({
      ...infos,
      [name]: value,
    }));
  };
  console.log("refresh: " + localStorage.getItem("refreshToken"));
  // JSX remains unchanged
  return (
    <LoginStyled>
      <div className="form_container">
        <h1>LOGIN</h1>
        <p className="welcome">Welcome to our site CanoChat</p>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email"
            icon={FiUser}
            value={userInfos.email}
            onChange={handleChange}
            name={"email"}
          />
          <InputField
            type="password"
            placeholder="Password"
            icon={HiOutlineLockClosed}
            value={userInfos.password}
            onChange={handleChange}
            name={"password"}
          />
          {loading ? (
            <SubmitButtonLoginRegister isSpinner={true} />
          ) : (
            <SubmitButtonLoginRegister label="Login Now" />
          )}

          <small>
            Don't have an account ?
            <Link to="/register">
              <span> Sign Up</span>
            </Link>
          </small>
        </form>
        <h3>Login with Others</h3>
        <Auth2Button>
          <ButtonAuth2Component label="Google" icon={FcGoogle} />
          <ButtonAuth2Component
            label="Facebook"
            icon={FaFacebookSquare}
            color={"#FFF"}
          />
        </Auth2Button>
      </div>
    </LoginStyled>
  );
};

export default Login;

const LoginStyled = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background: url(${bg}), lightgray 50% / cover no-repeat;
  background: #23272a;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }
  h1 {
    color: #fff;
    font-family: "Poppins";
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  .welcome {
    color: #fff;
    font-family: "Poppins";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .form_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #36393f;
    border-radius: 15px;
    gap: 20px;
    z-index: 2;
  }
  h3 {
    color: #fff;
    font-family: "Poppins";
    font-size: 1.2rem;
    font-style: normal;
    line-height: normal;
  }
  small {
    color: #fff;
    font-family: "Poppins";
    font-size: 0.8rem;
    font-style: normal;
    line-height: normal;
    margin-top: 10px;
    text-align: center;
  }
  .login {
    color: white;
    text-decoration: underline;
  }
`;

const Auth2Button = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
