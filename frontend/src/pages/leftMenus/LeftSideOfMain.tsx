import { FC, useState } from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import SearchBarComponent from "../../components/SearchBarComponent";
import { IoFilterSharp } from "react-icons/io5";
import FooterLeft from "./FooterLeft";
import UserMessage from "./UserMessage";
import ProfileUser from "../profile/ProfileUser";
import IconStandard from "../../components/IconStandard";
import styles from "./LeftSideOfMain.module.css";
import { listMenuItems } from "./listMenuItems";
import { ListOfUsersComponent } from "../friends/ListOfUsersComponent";
import { useMessages } from "../../contextAPI/MessagesContext";

interface User {
  username: string;
  message: string;
  createdAt: Date;
  unreadCount: number;
  profileImage: string;
}

const LeftSideOfMain: FC = () => {
  const [value, setValue] = useState<string>("");
  const [usersMessages, setUsersMessages] = useState<User[]>([
    {
      username: "Carel Lihoula",
      message: "salut carel",
      createdAt: new Date(),
      unreadCount: 100,
      profileImage:
        "https://storage.googleapis.com/netflixproject/assets/assets/profileIcon.png",
    },
    {
      username: "Luco Ntsoumou",
      message: "comment vas tu ? ",
      createdAt: new Date(),
      unreadCount: 5,
      profileImage:
        "https://storage.googleapis.com/netflixproject/assets/assets/profileIcon.png",
    },
  ]);
  const { selectedMenuItem } = useMessages();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  console.log(showProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [selectedItem, setSelectedItem] = useState<User>(usersMessages[0]);
  const ElementSelected = (item: User) => {
    setSelectedItem(item);
    console.log(selectedItem);
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
    <LeftSideOfMainStyle>
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
          <MessageOverview>
            {usersMessages?.map((user: User, index: number) => {
              const timer: string = user.createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <>
                  {/** differente conersation  */}
                  <UserMessage
                    name={user.username}
                    unreadNumber={user.unreadCount}
                    message={user.message}
                    profil={user.profileImage}
                    isSelected={selectedItem === user}
                    bg={selectedItem === user ? "#454950" : ""}
                    time={timer}
                    key={index}
                    handleClick={() => ElementSelected(user)}
                  />
                  {/*index !== usersMessages.length - 1 && (
                    <DividerComponent justifyBorder="right" />
                  )*/}
                </>
              );
            })}
          </MessageOverview>
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
    </LeftSideOfMainStyle>
  );
};

const LeftSideOfMainStyle = styled.div`
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

const MessageOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 40px;
  overflow-y: auto;
  max-height: 75%;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fff; /* Couleur de la barre de défilement elle-même */
  }
`;
export default LeftSideOfMain;
