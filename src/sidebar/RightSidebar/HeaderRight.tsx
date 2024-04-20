import { FC } from "react";
import styled from "styled-components";
import IconStandard from "../../components/common/IconStandard.tsx";
import { MdLocalPhone } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import styles from "./headerRight.module.css";
import { Avatar } from "../../components/common/Avatar.tsx";
import default__img from "../../assets/images/default__image.jpg";
import { useUsers } from "../../contextAPI/UsersContextt.tsx";
import { getUserSelectedId } from "../../localStorage/getUserSelected.ts";

const HeaderRight: FC = () => {
  const { usersList } = useUsers();
  const userSelectedId = Number(getUserSelectedId());
  const user = usersList.find((user) => user.id === userSelectedId);

  return (
    <NavLeftStyled>
      <div className={styles.user__selected}>
        <Avatar imageUrl={user?.profileImage || default__img} />
        <div className={styles.name__user}>{user?.name}</div>
      </div>
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
  justify-content: space-between;
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
