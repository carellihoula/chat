import { FC, useState } from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import SearchBarComponent from "../../components/SearchBarComponent";
import { IoFilterSharp } from "react-icons/io5";
import FooterLeft from "./FooterLeft";
import ProfileUser from "../profile/ProfileUser";
import IconStandard from "../../components/IconStandard";
import styles from "./LeftSidebar.module.css";
import { listMenuItems } from "./listMenuItems";
import { ListOfUsersComponent } from "../friends/ListOfUsersComponent";
import { useMessages } from "../../contextAPI/MessagesContext";
import { ConversationsList } from "./ConversationsList";

const LeftSidebar: FC = () => {
  const [value, setValue] = useState<string>("");
  const { selectedMenuItem } = useMessages();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  console.log(showProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const ProfileClickHandler = () => {
    setShowProfile(!showProfile);
  };
  const handleClickBack = () => {
    setShowProfile(false);
  };

  const hiddenProfile = () => {
    setShowProfile(false);
  };
  return (
    <SidebarContainer>
      <HeaderLeft
        ProfileClickHandler={ProfileClickHandler}
        hiddenProfile={hiddenProfile}
        listMenuItems={listMenuItems}
      />
      <div className={styles.container__intermediate}>
        {/** menu principal */}
        <SearchAndFilterComponent>
          <SearchBarComponent value={value} handleChange={handleChange} />
          <IconStandard size={24} Icon={IoFilterSharp} color={"#FFF"} />
        </SearchAndFilterComponent>

        {selectedMenuItem.label === "Chat" ? (
          <ConversationsList />
        ) : selectedMenuItem.label === "Friends" ? (
          <ListOfUsersComponent hiddenProfile={hiddenProfile} />
        ) : (
          <div style={{ color: "#FFF", textAlign: "center" }}>
            EN COURS DE PROGRAMMATION
          </div>
        )}
        <ProfileUser
          isClicked={showProfile}
          handleClickBack={handleClickBack}
        />
      </div>
      <ContainerFootLeft>
        <FooterLeft />
      </ContainerFootLeft>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  background: #2f3136;
  width: 30%;
  height: 100vh;
  //position: relative;
`;

const SearchAndFilterComponent = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
`;
const ContainerFootLeft = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: #fff;
`;

export default LeftSidebar;
