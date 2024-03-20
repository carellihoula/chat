import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import HeaderRight from "./HeaderRight";
import ChatAreaRightBottom from "./ChatAreaRightBottom";
import MessageComponent from "../../components/MessageComponent";
import { useMessages } from "../../contextAPI/MessagesContext";
import { getIdCurrentUser } from "../../../utils/getIdCurrentUser";
import { ChatMessage } from "../../websocket/useChat";
import { useUsers } from "../../contextAPI/UsersContextt";
//import "../../output.css";

interface ConversationAreaProps {
  isSender: boolean;
}

const RightSideOfMain: FC = () => {
  const { messages } = useMessages();
  const { userSelected } = useUsers();
  console.log(messages);
  const conversationRef = useRef<HTMLDivElement>(null);
  const token = JSON.stringify(localStorage.getItem("token"));

  useEffect(() => {
    if (conversationRef && conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  const messagesFiltered = messages.filter((msg) => {
    const currentUserId = getIdCurrentUser(token);
    return (
      (msg.senderId === currentUserId &&
        msg.recipientId === userSelected?.id) ||
      (msg.senderId === userSelected?.id && msg.recipientId === currentUserId)
    );
  });
  return (
    <RightSideOfMainStyle>
      <HeaderRight />
      <ConversationArea ref={conversationRef}>
        {messagesFiltered.map((msg: ChatMessage, index) => {
          console.log(msg);
          const timer = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <StyledMessageComponent
              isSender={msg.senderId !== getIdCurrentUser(token)}
              key={index}
            >
              <MessageComponent
                isSender={msg.senderId !== getIdCurrentUser(token)}
                message={msg.content}
                time={timer}
              />
            </StyledMessageComponent>
          );
        })}

        <div className="flex  flex-col self-end justify-end w-full"></div>

        {/*<MessageComponent
          isSender={false}
          message="salut, comment vas-tu ?"
          time="12:00"
        />
        <MessageComponent
          isSender={false}
          message="salut, comment vas-tu ? , hier je suis venu chez toi, je t'ai pas vu, ou etais-tu  ?"
          time="12:00"
        />
        <MessageComponent
          isSender={true}
          message="salut, comment vas-tu ?"
          time="12:00"
        />
        <MessageComponent
          isSender={true}
          message="salut, comment vas-tu ?"
          time="12:00"
    />*/}
      </ConversationArea>
      <ChatAreaRightBottom />
    </RightSideOfMainStyle>
  );
};

const RightSideOfMainStyle = styled.div`
  display: flex;
  flex-direction: column;
  background: #36393f;
  width: 70%;
  height: 100vh;
  position: relative;
`;

const ConversationArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  padding: 20px 40px;
  overflow-y: auto;
  margin-bottom: 100px;
`;

const StyledMessageComponent = styled.div<ConversationAreaProps>`
  align-self: ${(props) => (props.isSender ? "flex-start" : "flex-end")};
  /* Autres styles pour le composant MessageComponent */
`;

export default RightSideOfMain;
