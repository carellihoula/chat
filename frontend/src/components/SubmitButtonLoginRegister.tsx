import  { FC } from 'react'
import styled from 'styled-components'
interface ButtonProps{
    label:string
}
const SubmitButtonLoginRegister:FC<ButtonProps> = ({label}) => {
  return (
    <ButtonStyled>
        {label}
    </ButtonStyled>
  )
}

export default SubmitButtonLoginRegister

const ButtonStyled = styled.button`
    display:flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: linear-gradient(100deg, #9181F4 -5.85%, #5038ED 109.55%);
    box-shadow: 0px 8px 21px 0px rgba(0, 0, 0, 0.16);
    width: 124px;
    height: 52px;
    flex-shrink: 0;
    border-style: none;
    color: #FFF;
    font-family: 'Poppins';
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor:pointer;
`