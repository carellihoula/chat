import { FC } from "react";
import styled from "styled-components";
import IconProfilComponent from "../../components/IconProfilComponent";
import default__img from "../../assets/images/default__image.jpg";
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
          imageUrl={userInfo?.profileImage || default__img}
          ProfileClickHandler={ProfileClickHandler}
        />
        {listMenuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              label={item.label}
              icon={item.icon}
              color={item.color}
              bg={item.label === selectedMenuItem.label}
              handleClick={() => selectedMenuItemHandler(item)}
            />
          );
        })}
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
