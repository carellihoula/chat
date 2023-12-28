import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { connectUser } from '../../redux/connectionStatus/status.action';
import { AppDispatch } from '../../redux/store';
import InputField from '../../components/InputField';
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import SubmitButtonLoginRegister from '../../components/SubmitButtonLoginRegister';
import bg from '../../assets/images/backgroundWhatsapp.jpeg'
import ButtonAuth2Component from '../../components/ButtonAuth2Component';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
// Define a type for your state
type UserInfos = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  //const user = useSelector(state:RootState => )
  
  ;
  const [userInfos, setUserInfos] = useState<UserInfos>({
    email: "",
    password: ""
  });
  const [user, setUser] = useState(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch an action here if needed
    // dispatch(yourActionCreator(userInfos.email, userInfos.password));
   
      dispatch(connectUser(userInfos))

    setUserInfos({
      email: "",
      password: ""
    });


  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfos(infos => ({
      ...infos, 
      [name]: value
    }));
  };

  // JSX remains unchanged
  return (
    <LoginStyled>
      <div className='form_container'>
        <h1>LOGIN</h1>
        <p className='welcome'>Welcome to our site CanoChat</p>
        <form onSubmit={handleSubmit}>
            <InputField type="email" 
              placeholder='Email' 
              icon={FiUser}
              value={userInfos.email} 
              onChange={handleChange} 
              name={"email"}
            />
            <InputField type="password" 
              placeholder='Password' 
              icon={HiOutlineLockClosed}
              value={userInfos.password} 
              onChange={handleChange} 
              name={"password"}
            />
            
            <SubmitButtonLoginRegister label="Login Now" />
            <small>
                Don't have an account?
                <Link to="/register"><span className='login'> Sign Up</span></Link> 
            </small>
        </form>
        <h3>Login with Others</h3>
        <Auth2Button>
            <ButtonAuth2Component label="Google" icon={FcGoogle}/>
            <ButtonAuth2Component label="Facebook" icon={FaFacebookSquare}/>
        </Auth2Button>
        

      </div>
    </LoginStyled>
  );
};

export default Login;

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background: url(${bg}), lightgray 50% / cover no-repeat;
  background: #8DA4EF;
  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;

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
  .form_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #FFF;
    border-radius: 15px;
    gap:20px;
  }
  h3{
    color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 1.2rem;
    font-style: normal;
    line-height: normal;
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
  .login{
    color:#0588F0;
    text-decoration: underline;
  }
`;

const Auth2Button = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
`


