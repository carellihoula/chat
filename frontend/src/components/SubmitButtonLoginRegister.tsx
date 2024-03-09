import { FC } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import styled from "styled-components";
interface ButtonProps {
  label?: string;
  isSpinner?: boolean;
}
const SubmitButtonLoginRegister: FC<ButtonProps> = ({ label, isSpinner }) => {
  return (
    <ButtonStyled>
      {isSpinner ? <Spinner animation="border" variant="light" /> : label}
    </ButtonStyled>
  );
};

export default SubmitButtonLoginRegister;

const ButtonStyled = styled.button`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #5865f2;
  box-shadow: 0px 8px 21px 0px rgba(0, 0, 0, 0.16);
  width: 100%;
  height: 52px;
  flex-shrink: 0;
  border-style: none;
  color: #fff;
  font-family: "Poppins";
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
