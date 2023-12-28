import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Register: FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration logic here using userInfo state
    console.log('Registration data:', userInfo);
    // Reset form fields after submission
    setUserInfo({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <RegisterStyled>
      <div className="form_container">
        <h1>REGISTER</h1>
        <p>Welcome to our site CanoChat</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Type your username"
              required
              value={userInfo.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              required
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
              required
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register Now</button>
        </form>
        <h3>Register with Others</h3>
        <div>
          <p>Register with Google</p>
        </div>
        <div>
          <p>Register with Facebook</p>
        </div>
      </div>
    </RegisterStyled>
  );
};

export default Register;

const RegisterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .form_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
`;
