//import React from 'react'
import {MessageInput} from "../../components/message/MessageInput.tsx";
import IconStandard from "../../components/common/IconStandard.tsx";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidMicrophone } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import { useChat } from "../../hook/websocket/useChat.ts";
import { getIdCurrentUser } from "../../utils/getIdCurrentUser.ts";
import styles from "./ChatAreaRightBottom.module.css";
import { useUsers } from "../../contextAPI/UsersContextt.tsx";
/*interface Props {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}*/

const ChatAreaRightBottom = () => {
  const token = localStorage.getItem("token");
  const userId = getIdCurrentUser(token);
  const { sendMessage } = useChat(userId);
  const [message, setMessage] = useState<string>("");
  //const token = JSON.stringify(localStorage.getItem("token"))
  const [value, setValue] = useState<string>("");
  const [textAreaHeight, setTextAreaHeight] = useState<string | number>("");
  const { userSelected } = useUsers();
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
      recipientId: userSelected?.id,
      content: message,
      isRead: false,
      timestamp: new Date(),
    });
    setMessage("");
  };

  return (
    <div className={styles.container__div}>
      <div className={styles.sub__container}>
        <IconStandard size={24} Icon={BsEmojiSmile} color="#FFF" />
        <MessageInput
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
      </div>
    </div>
  );
};

export default ChatAreaRightBottom;
