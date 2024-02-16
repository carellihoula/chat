import { FC } from "react";
import styled from "styled-components";
import IconProfilComponent from "../../components/IconProfilComponent";
import IconStandard from "../../components/IconStandard";
//import { FiMoreVertical } from "react-icons/fi";
import profileImage from "../../assets/images/profileIcon.png";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineMore } from "react-icons/md";
import styles from "./LeftSideOfMain.module.css";

interface Props {
  ProfileClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const HeaderLeft: FC<Props> = ({ ProfileClickHandler }) => {
  return (
    <NavLeftStyled>
      <IconDiv>
        <IconProfilComponent
          imageUrl={profileImage}
          ProfileClickHandler={ProfileClickHandler}
        />
        <div className={styles.menu_item}>
          <IconStandard size={24} Icon={IoMdSettings} color={"#FFF"} />
          <span>Settings</span>
        </div>
        <div className={styles.menu_item}>
          <IconStandard size={20} Icon={MdOutlineMore} color={"#FFF"} />
          <span>More</span>
        </div>
      </IconDiv>
    </NavLeftStyled>
  );
};

const NavLeftStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #36393f;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  border-right: 3px solid #2f3136;
  span {
    font-family: "Work Sans";
  }
`;
const IconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default HeaderLeft;
