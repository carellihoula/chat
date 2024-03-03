import { FC } from "react";
import styled from "styled-components";
import IconProfilComponent from "../../components/IconProfilComponent";
//import profileImage from "../../assets/images/profileIcon.png";
import MenuItem, { MenuItemProps } from "./MenuItem";
import { useMessages } from "../../contextAPI/MessagesContext";
import { useUsers } from "../../contextAPI/UsersContextt";
//import { listMenuItems } from "./listMenuItems";

interface Props {
  ProfileClickHandler: React.MouseEventHandler<HTMLDivElement>;
  hiddenProfile: () => void;
  listMenuItems: MenuItemProps[];
}

const HeaderLeft: FC<Props> = ({
  ProfileClickHandler,
  listMenuItems,
  hiddenProfile,
}) => {
  const { selectedMenuItem, setSelectedMenuItem } = useMessages();
  const { userInfo } = useUsers();
  const selectedMenuItemHandler = (item: MenuItemProps) => {
    setSelectedMenuItem(item);
    hiddenProfile();
  };
  console.log(selectedMenuItem);

  return (
    <NavLeftStyled>
      <IconDiv>
        <IconProfilComponent
          imageUrl={userInfo?.profileImage}
          ProfileClickHandler={ProfileClickHandler}
        />
        {listMenuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              label={item.label}
              icon={item.icon}
              color={item.color}
              handleClick={() => selectedMenuItemHandler(item)}
            />
          );
        })}
        {/*<MenuItem label={"Chat"} icon={MdOutlineChat} color={"#FFF"} />
        <MenuItem label={"Friends"} icon={LiaUserFriendsSolid} color={"#FFF"} />
      <MenuItem label={"Settings"} icon={IoMdSettings} color={"#FFF"} />*/}
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
