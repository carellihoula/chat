import React, { ChangeEvent } from "react";
import styled from "styled-components";
import IconStandard from "./IconStandard.tsx";
import { IconType } from "react-icons";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  icon: IconType | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <InputFieldStyled>
      <IconStandard Icon={icon} size={24} color={"#FFF"} />
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
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-radius: 16px;
  background: #23272a;
  width: 364px;
  height: 52px;
  flex-shrink: 0;
  margin-bottom: 10px;
  input {
    color: #fff;
    font-family: "Poppins";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    padding-left: 10px;
    line-height: normal;
    border-style: none;
    background: #23272a;
    outline: none;
    width: 90%;
    height: 100%;
    &::placeholder {
      color: #fff;
      font-family: "Poppins";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
