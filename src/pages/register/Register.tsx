import React, { ChangeEvent, FC, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postData } from "../../api/API";
import InputField from "../../components/common/InputField.tsx";
import ButtonAuth2Component from "../../components/ui/ButtonAuth2Component.tsx";
import SubmitButtonLoginRegister from "../../components/ui/SubmitButtonLoginRegister.tsx";
import ToastComponent from "../../toastify/ToastComponent.tsx";
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
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPasswordComplexity, setErrorPasswordComplexity] =
    useState<string>("");
  const [toast, setToast] = useState({
    hasError: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
        "Password must be at least 8 characters long."
      );
      return;
    }
    if (!validateEmail(userInfos.email)) {
      setErrorEmail("Invalid email format.");
      return;
    }
    setIsLoading(true); // Mettre isLoading à true pour afficher le spinner

    try {
      await postData("/auth/register", userInfos);
      //console.log("Données envoyées avec succès :", result);
      setToast({
        hasError: false,
        message:
          "your account has been created successfully, please check your email to validate your account.",
      });
    } catch (error) {
      setToast({
        hasError: true,
        message: "oops error creating your account, please try again!",
      });
      console.error("Erreur lors de l'envoi des données.", error);
    } finally {
      setIsLoading(false);
    }

    setUserInfos({
      username: "",
      email: "",
      password: "",
    });
    setPasswordConfirm("");
  };
  const handleClose = () => {
    setToast((prev) => ({
      ...prev,
      message: "",
    }));
  };

  //console.log(localStorage.getItem("token"));
  return (
    <RegisterStyled>
      <div className="form_container">
        {toast.message !== "" && (
          <ToastComponent
            message={toast.message}
            hasError={toast.hasError}
            onClose={handleClose}
          />
        )}
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

          <SubmitButtonLoginRegister label="Sign Up" isSpinner={isLoading} />

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
