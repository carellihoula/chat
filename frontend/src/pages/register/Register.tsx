import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import InputField from "../../components/InputField";
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import SubmitButtonLoginRegister from "../../components/SubmitButtonLoginRegister";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import ButtonAuth2Component from "../../components/ButtonAuth2Component";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { postData } from "../../api/API";
import {
  validateEmail,
  validatePasswordComplexity,
} from "../../validators/validators";

export type UserInfos = {
  email: string;
  password: string;
  username: string; // Champ pour le nom d'utilisateur
};

const Register: FC = () => {
  const token = localStorage.getItem("token");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPasswordComplexity, setErrorPasswordComplexity] =
    useState<string>("");

  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<UserInfos>({
    password: "",
    email: "",
    username: "",
  });

  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos((infos) => ({
      ...infos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfos.password !== passwordConfirm) {
      setErrorPassword("Passwords do not match.");
      return;
    }
    if (!validatePasswordComplexity(userInfos.password)) {
      setErrorPasswordComplexity(
        "Password must be at least 8 characters long and include uppercase letters, numbers, and symbols."
      );
      return;
    }
    if (!validateEmail(userInfos.email)) {
      setErrorEmail("Invalid email format.");
      return;
    }

    try {
      await postData("/auth/register", userInfos);
      //console.log("Données envoyées avec succès :", result);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
    }

    setUserInfos({
      username: "",
      email: "",
      password: "",
    });
    setPasswordConfirm("");
  };

  useEffect(() => {
    if (token) {
      navigate("/login"); // Redirection vers la page principale
    }
  }, [token, navigate]);

  //console.log(localStorage.getItem("token"));
  return (
    <RegisterStyled>
      <div className="form_container">
        <h1>REGISTER</h1>
        <p className="welcome">Welcome to our site CanoChat</p>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Username"
            icon={FiUser}
            value={userInfos.username}
            onChange={handleChange}
            name="username"
          />
          <InputField
            type="email"
            placeholder="Email"
            icon={MdAlternateEmail}
            value={userInfos.email}
            onChange={handleChange}
            name="email"
          />
          <InputField
            type="password"
            placeholder="Password"
            icon={HiOutlineLockClosed}
            value={userInfos.password}
            onChange={handleChange}
            name="password"
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            icon={HiOutlineLockClosed}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            name="passwordConfirm"
          />

          <SubmitButtonLoginRegister label="Sign Up" />

          <small>
            Already have an account ?
            <Link to="/login">
              <span className="sign__up"> Sign In</span>
            </Link>
          </small>
        </form>

        <small className="error__message" style={{ color: "red" }}>
          {errorPassword}
        </small>
        {errorPasswordComplexity && (
          <small className="error__message" style={{ color: "red" }}>
            {errorPasswordComplexity}
          </small>
        )}
        {errorEmail && (
          <small className="error__message" style={{ color: "red" }}>
            {errorEmail}
          </small>
        )}

        <h3>Continue with Others</h3>
        <Auth2Button>
          <ButtonAuth2Component label="Google" icon={FcGoogle} />
          <ButtonAuth2Component
            label="Facebook"
            icon={FaFacebookSquare}
            color={"#FFF"}
          />
        </Auth2Button>
      </div>
    </RegisterStyled>
  );
};

export default Register;

const RegisterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #23272a;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }

  h3 {
    color: #fff;
    font-family: "Poppins";
    font-size: 1.2rem;
    font-style: normal;
    line-height: normal;
  }
  .form_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    padding: 10px 0;
    box-sizing: content-box;
    background: #36393f;
    border-radius: 15px;
    gap: 10px;
  }
  small {
    color: #fff;
    text-align: center;
    //max-width: 100%;
    font-family: "Poppins";
    font-size: 0.8rem;
    font-style: normal;
    line-height: normal;
    margin-top: 5px;
    text-align: center;
  }
  .error__message {
    width: 100%;
  }
  .sign__up {
    color: #0588f0;
    text-decoration: underline;
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
`;

const Auth2Button = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
