import { FaLock } from "react-icons/fa";
import styled from 'styled-components';

const FooterLeft = () => {
  return (
    <FooterLeftStyled>
      <FaLock color="#6B7C85"/>
      <p>your personnal messages are <span>end-to-end encrypted</span></p>
    </FooterLeftStyled>
  )
}

const FooterLeftStyled = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 90%;
height: 50px;
gap : 5px;
position: absolute;
bottom: 0;
background: #FFF;
border-top: 1px solid #E9EDEF;

span{
    color:#55a8cd;
    
}
p{
    font-family: 'Work Sans';
}
`

export default FooterLeft
