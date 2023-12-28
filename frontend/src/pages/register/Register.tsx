import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import InputField from '../../components/InputField';
import { FiUser } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import SubmitButtonLoginRegister from '../../components/SubmitButtonLoginRegister';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import ButtonAuth2Component from '../../components/ButtonAuth2Component';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { registerReducer } from '../../redux/connectionStatus/status.reducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/connectionStatus/status.action';

type UserInfos = {
  email: string;
  password: string;
  username: string; // Champ pour le nom d'utilisateur
   // Champ pour la confirmation du mot de passe
};


const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [userInfos, setUserInfos] = useState<UserInfos>({
    username: "",
    email: "",
    password: "",
    
  });

  const [passwordConfirm, setPasswordConfirm] = useState<string>("")


  const [errorPassword, setErrorPassword] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos(infos => ({
      ...infos, 
      [name]: value
    }));
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (userInfos.password !== passwordConfirm) {
      setErrorPassword("Passwords do not match.");
      return;
    }
  
    // Reste de la logique de soumission
    dispatch(registerUser(userInfos))
    window.location.href='/main'
    
    
  };
  

  return (
    <RegisterStyled>
      <div className="form_container">
        <h1>REGISTER</h1>
        <p className='welcome'>Welcome to our site CanoChat</p>
      <form onSubmit={handleSubmit}>
          <InputField 
            type="text" 
            placeholder='Username' 
            icon={FiUser} 
            value={userInfos.username} 
            onChange={handleChange} 
            name="username"
          />
          <InputField 
            type="email" 
            placeholder='Email' 
            icon={MdAlternateEmail} 
            value={userInfos.email} 
            onChange={handleChange} 
            name="email"
          />
          <InputField 
            type="password" 
            placeholder='Password' 
            icon={HiOutlineLockClosed} 
            value={userInfos.password} 
            onChange={handleChange} 
            name="password"
          />
          <InputField 
            type="password" 
            placeholder='Confirm Password' 
            icon={HiOutlineLockClosed} 
            value={passwordConfirm} 
            onChange={(e)=>setPasswordConfirm(e.target.value)} 
            name="passwordConfirm"
          />

          <SubmitButtonLoginRegister label="Sign Up" />
          <small style={{color:"red"}}>
              {errorPassword}
          </small>
          <small>
              Already have an account?
              <Link to="/login"><span className='sign__up'> Sign In</span></Link> 
          </small>
          
      </form>

        <h3>Continue with Others</h3>
        <Auth2Button>
            <ButtonAuth2Component label="Google" icon={FcGoogle}/>
            <ButtonAuth2Component label="Facebook" icon={FaFacebookSquare}/>
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
  background: #8DA4EF;

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;

  }

  h3{
    color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 1.2rem;
    font-style: normal;
    line-height: normal;
  }
  .form_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 40px;
    background: #FFF;
    border-radius: 15px;
    gap:20px;
  }
  small{
    color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 0.8rem;
    font-style: normal;
    line-height: normal;
    margin-top: 10px;
    text-align: center;
  }
  .sign__up{
    color:#0588F0;
    text-decoration: underline;
  }
  h1{
    color: #000;
    font-family: 'Poppins';
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  .welcome{
    color: #525252;
    font-family: 'Poppins';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Auth2Button = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
`
