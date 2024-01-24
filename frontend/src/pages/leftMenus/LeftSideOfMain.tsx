import { FC, useState } from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import SearchBarComponent from "../../components/SearchBarComponent";
import { IoFilterSharp } from "react-icons/io5";
import DividerComponent from "../../components/DividerComponent";
import FooterLeft from "./FooterLeft";
import UserMessage from "./UserMessage";
import ProfileUser from "../profile/ProfileUser";
import { useUsers } from "../../contextAPI/UsersContextt";

const LeftSideOfMain: FC = () => {
  const [value, setValue] = useState<string>("");
  const { users, setReceiver } = useUsers();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  //console.log(showProfile)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /*const handleConversation = (conv: Conversation) => {
    dispatch(manageConversationSelected(conv));
  };*/
  const ProfileClickHandler = () => {
    setShowProfile(true);
  };
  const handleClickBack = () => {
    setShowProfile(false);
  };

  return (
    <LeftSideOfMainStyle>
      <ProfileUser isClicked={showProfile} handleClickBack={handleClickBack} />
      {!showProfile && (
        <>
          <HeaderLeft ProfileClickHandler={ProfileClickHandler} />

          <SearchAndFilterComponent>
            <SearchBarComponent value={value} handleChange={handleChange} />
            <IoFilterSharp color={"#54656F"} size={24} />
          </SearchAndFilterComponent>

          <DividerComponent justifyBorder="full" />

          <MessageOverview>
            {/*conversations.map((chat, index) => {
              const lastElement: Message =
                chat.messages[chat.messages.length - 1];
              const time: string = new Date(
                lastElement.timestamp
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              return (
                <>
                  <UserMessage
                    name={lastElement.senderName}
                    unreadNumber={chat.unreadNumber}
                    message={lastElement.text}
                    time={time}
                    key={index}
                    handleConversation={() => handleConversation(chat)}
                  />
                  {index !== conversations.length - 1 && (
                    <DividerComponent justifyBorder="right" />
                  )}
                </>
              );
            })*/}
            {users?.map((user, index) => {
              return (
                <>
                  <UserMessage
                    name={user.username}
                    unreadNumber={0}
                    message={user.username}
                    time={user.username}
                    key={index}
                    handleConversation={() => setReceiver(user)}
                  />
                  {index !== users.length - 1 && (
                    <DividerComponent justifyBorder="right" />
                  )}
                </>
              );
            })}
            {/*<UserMessage /> */}
          </MessageOverview>

          <ContainerFootLeft>
            <FooterLeft />
          </ContainerFootLeft>
        </>
      )}
    </LeftSideOfMainStyle>
  );
};

const LeftSideOfMainStyle = styled.div`
  background: #fff;
  width: 30%;
  height: 100%;
  position: relative;
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
  width: 100%;
  padding-bottom: 40px;
  overflow-y: auto;
  max-height: 75%;
`;
export default LeftSideOfMain;
