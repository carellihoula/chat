import { FaLock } from "react-icons/fa";
import styled from "styled-components";
import IconStandard from "../../components/IconStandard";

const FooterLeft = () => {
  return (
    <FooterLeftStyled>
      <IconStandard size={16} Icon={FaLock} color="#FFF" />
      <div className="copyright">Built by Carel@Dev</div>
    </FooterLeftStyled>
  );
};

const FooterLeftStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  gap: 10px;
  position: absolute;
  bottom: 0;
  background: #2f3136;
  border-top: 3px solid #36393f;

  .copyright {
    font-family: "Work Sans";
    color: #fff;
    font-size: 0.8rem;
  }
`;

export default FooterLeft;
