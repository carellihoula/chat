import { FC } from "react";
import styled from "styled-components";
import IconStandard from "../../components/IconStandard";
import { MdLocalPhone } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
//import profileImage from "../../assets/images/Ellipse4.png";

const HeaderRight: FC = () => {
  return (
    <NavLeftStyled>
      {/*<IconProfilComponent imageUrl={profileImage} />*/}

      <IconDiv>
        <div className="phone_border">
          <IconStandard size={24} Icon={MdLocalPhone} color="#FFF" />
        </div>
        <div className="phone_border">
          <IconStandard size={24} Icon={IoMdVideocam} color="#FFF" />
        </div>
      </IconDiv>
    </NavLeftStyled>
  );
};

const NavLeftStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  background: #36393f;
  width: 100%;
  height: auto;
`;

const IconDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  background-color: #2f3136;
  gap: 5px;
  .phone_border {
    padding: 8px;
    border-radius: 10px;
    &:hover {
      background-color: #1e1e1e;
      cursor: pointer;
    }
  }
`;

export default HeaderRight;
