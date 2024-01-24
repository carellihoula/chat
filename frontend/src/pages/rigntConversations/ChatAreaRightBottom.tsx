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
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { messages, setMessages } = useMessages();
  const socketRef = useRef<Socket | null>(null);

  console.log(messages);

  localStorage.setItem("messages", JSON.stringify(messages));
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

  useEffect(() => {
    // Initialisation de la socket
    socketRef.current = io("http://localhost:9784", {
      reconnection: true, // Active la reconnexion automatique
      reconnectionAttempts: 5, // Nombre maximal de tentatives de reconnexion
      reconnectionDelay: 1000, // Délai initial avant de retenter une reconnexion (ms)
      reconnectionDelayMax: 5000, // Délai maximal entre les tentatives de reconnexion (ms)
      autoConnect: true, // Se connecte automatiquement dès l'initialisation
      // ...autres options si nécessaire
    });
    //socketRef.current.emit("join", getIdCurrentUser(token));
    socketRef.current.on("messagesHistory", (messagesHistory) => {
      setMessages(messagesHistory);
      console.log(messagesHistory);
    });
    socketRef.current.on("receiveMessage", (msg: Message) => {
      setMessages((prevMessages: Message[]) => [...prevMessages, msg]);
    });

    socketRef.current.on("usersList", (usersList) => {
      setUsers(usersList);
    });

    // Nettoyage
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Ajoutez les dépendances nécessaires

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiver?._id,
        content: message,
      });
      setMessage("");
      console.log(user?._id);
    }
  };

  return (
    <ChatAreaRightBottomStyled>
      <ContainerComponent>
        <IconStandard size={24} Icon={BsEmojiSmile} />
        <IconStandard size={24} Icon={GrAttachment} />
        <TextZoneComponent
          value={message}
          handleChange={handleChange}
          handleResizeHeight={handleResizeHeight}
          textAreaHeight={textAreaHeight}
        />
        {value ? (
          <IconStandard size={24} Icon={VscSend} handleClick={sendMessage} />
        ) : (
          <IconStandard size={24} Icon={BiSolidMicrophone} />
        )}
      </ContainerComponent>
    </ChatAreaRightBottomStyled>
  );
};

const ChatAreaRightBottomStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  width: 100%;
  height: auto;
  padding: 20px 0px;
  border-left: 1px solid #c9cdcf;
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
