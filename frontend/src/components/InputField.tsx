import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FiUser } from "react-icons/fi";
import IconStandard from './IconStandard';
import { IconType } from 'react-icons';

interface InputFieldProps {
  
  type: string;
  name: string;
  placeholder: string;
  value: string;
  icon:IconType|string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon, type, name, placeholder, value, onChange }) => {
  return (
    <InputFieldStyled>
      <IconStandard Icon={icon} size={24} color={"#1C1C1C"}/>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </InputFieldStyled>
  );
};

export default InputField;

const InputFieldStyled = styled.div`
display:flex;
align-items:center;
padding-left: 15px;
border-radius: 16px;
background: rgba(240, 237, 255, 0.80);
width: 364px;
height: 52px;
flex-shrink: 0;
margin-bottom: 10px;
input{
    color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    padding-left: 10px;
    line-height: normal;
    border-style: none;
    background: rgba(240, 237, 255, 0.80);
    outline: none;
    width: 90%;
    height: 100%;
&::placeholder{
    color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
}

`
