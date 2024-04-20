import React from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/base";
import { FaCirclePlus } from "react-icons/fa6";
import { FC } from "react";

interface ComponentProps {
  value: string;
  handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}

const textAreaStyles: React.CSSProperties = {
  width: "100%",
  paddingLeft: "50px", // Ajustez en fonction de la taille de l'icône
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#202225",
  color: "#d8d8d8",
  fontFamily: "Work Sans, sans-serif",
  fontSize: "14px",
  resize: "none",
  boxSizing: "border-box",
  outline: "none",
};

export const MessageInput: FC<ComponentProps> = ({ value, handleChange }) => {
  return (
    <MessageInputContainer>
      <IconContainer>
        <FaCirclePlus size={24} color="#FFF" />
      </IconContainer>
      <TextareaAutosize
        style={textAreaStyles}
        minRows={1.5}
        maxRows={6}
        maxLength={1000}
        aria-label="message input"
        placeholder="Type a message"
        value={value}
        onChange={handleChange}
        autoFocus
      />
    </MessageInputContainer>
  );
};

const MessageInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  background: #202225;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

export default MessageInput;
