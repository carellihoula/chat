import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import HeaderRight from "./HeaderRight.tsx";
import ChatAreaRightBottom from "./ChatAreaRightBottom.tsx";
import MessageComponent from "../../components/message/MessageItem.tsx";
import { useMessages } from "../../contextAPI/MessagesContext.tsx";
import { getIdCurrentUser } from "../../utils/getIdCurrentUser.ts";
import { ChatMessage } from "../../types_interfaces/index.ts";

import { useUsers } from "../../contextAPI/UsersContextt.tsx";
//import "../../output.css";

interface ConversationAreaProps {
  isSender: boolean;
}

const RightSideOfMain: FC = () => {
  const { msgByCurrentUser } = useMessages();

  const { userSelected } = useUsers();
  const conversationRef = useRef<HTMLDivElement>(null);
  const token = JSON.stringify(localStorage.getItem("token"));

  useEffect(() => {
    if (conversationRef && conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [msgByCurrentUser]);

  const messagesFiltered = msgByCurrentUser.filter((msg) => {
    //const currentUserId = getIdCurrentUser(token);
    return (
      msg.recipientId === userSelected?.id || msg.senderId === userSelected?.id
    );
  });
  return (
    <RightSideOfMainStyle>
      <HeaderRight />
      <ConversationArea ref={conversationRef}>
        {messagesFiltered.map((msg: ChatMessage, index) => {
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
  padding: 20px 40px 100px 40px;
  overflow-y: auto;
`;

const StyledMessageComponent = styled.div<ConversationAreaProps>`
  align-self: ${(props) => (props.isSender ? "flex-start" : "flex-end")};
  /* Autres styles pour le composant MessageComponent */
`;

export default RightSideOfMain;
