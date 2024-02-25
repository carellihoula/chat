//import React from 'react'
import styled from "styled-components";
import TextZoneComponent from "../../components/TextZoneComponent";
import IconStandard from "../../components/IconStandard";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidMicrophone } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import { useChat } from "../../websocket/useChat";
import { getIdCurrentUser } from "../../../utils/getIdCurrentUser";

/*interface Props {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}*/

const ChatAreaRightBottom = () => {
  const token = localStorage.getItem("token");
  const userId = getIdCurrentUser(token as string);
  const { sendMessage } = useChat(userId.toString());
  const [message, setMessage] = useState<string>("");
  //const token = JSON.stringify(localStorage.getItem("token"))
  const [value, setValue] = useState<string>("");
  const [textAreaHeight, setTextAreaHeight] = useState<string | number>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto");
    setMessage(e.target.value);
    setValue(e.target.value);
  };

  const handleResizeHeight = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight(e.currentTarget.scrollHeight);
  };

  const sendMessageHandler = () => {
    sendMessage({
      senderId: userId,
      recipientId: 2,
      content: message,
      timestamp: new Date(),
    });
    setMessage("");
  };

  return (
    <ChatAreaRightBottomStyled>
      <ContainerComponent>
        <IconStandard size={24} Icon={BsEmojiSmile} color="#FFF" />
        <TextZoneComponent
          value={message}
          handleChange={handleChange}
          handleResizeHeight={handleResizeHeight}
          textAreaHeight={textAreaHeight}
        />
        {value ? (
          <IconStandard
            size={24}
            Icon={VscSend}
            handleClick={sendMessageHandler}
            color="#FFF"
          />
        ) : (
          <IconStandard size={24} Icon={BiSolidMicrophone} color="#FFF" />
        )}
      </ContainerComponent>
    </ChatAreaRightBottomStyled>
  );
};

const ChatAreaRightBottomStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #36393f;
  width: 100%;
  height: auto;
  padding: 20px 0px;
  position: absolute;
  bottom: 0;
`;

const ContainerComponent = styled.div`
  display: flex;
  align-items: center;
  //justify-content: center;
  gap: 25px;
`;

export default ChatAreaRightBottom;
