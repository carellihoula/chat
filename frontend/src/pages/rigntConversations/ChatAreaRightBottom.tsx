//import React from 'react'
import styled from "styled-components";
import TextZoneComponent from "../../components/TextZoneComponent";
import IconStandard from "../../components/IconStandard";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { BiSolidMicrophone } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useUsers } from "../../contextAPI/UsersContextt";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Message, useMessages } from "../../contextAPI/MessagesContext";

/*interface Props {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}*/

const ChatAreaRightBottom = () => {
  const [message, setMessage] = useState<string>("");
  //const [receiverId, setReceiverId] = useState<string>("");
  const { setUsers, receiver } = useUsers();
  const userId = useSelector((state: RootState) => state.user.userInfo)?._id;
  console.log(userId);
  const { messages, setMessages } = useMessages();
  const socketRef = useRef<Socket | null>(null);

  console.log(messages);

  const token = JSON.stringify(localStorage.getItem("token"));
  console.log(token);

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

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        senderId: userId,
        receiverId: receiver?._id,
        content: message,
      });
      setMessage("");
      console.log(userId);
    }
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
            handleClick={sendMessage}
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
