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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
//import { registerUser } from "../../redux/loginAndRegister/status.action";
import { postData } from "../../api/API";

export type UserInfos = {
  email: string;
  password: string;
  nom: string; // Champ pour le nom d'utilisateur
  // Champ pour la confirmation du mot de passe
};

const Register: FC = () => {
  const token = useSelector((state: RootState) => state.islogged.token);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<UserInfos>({
    nom: "",
    email: "",
    password: "",
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

    // Reste de la logique de soumission
    //dispatch(registerUser(userInfos));
    try {
      const result = await postData("/inscription", userInfos);
      console.log("Données envoyées avec succès :", result);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
    }

    setUserInfos({
      nom: "",
      email: "",
      password: "",
    });
    setPasswordConfirm("");
  };

  useEffect(() => {
    if (token) {
      navigate("/login"); // Redirection vers la page principale
    }
  }, [token, navigate, dispatch]);

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
            value={userInfos.nom}
            onChange={handleChange}
            name="nom"
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
          <small style={{ color: "red" }}>{errorPassword}</small>
          <small>
            Already have an account ?
            <Link to="/login">
              <span className="sign__up"> Sign In</span>
            </Link>
          </small>
        </form>

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
    padding: 20px 40px;
    background: #36393f;
    border-radius: 15px;
    gap: 10px;
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
