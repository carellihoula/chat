import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../components/common/Avatar.tsx";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { LuArchive } from "react-icons/lu";
import { AiOutlineClear } from "react-icons/ai";

interface MessageComponentProps {
  name: string;
  message: string;
  unreadNumber: number;
  time: string;
  profil: string;
  isSelected: boolean;
  bg: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  //showDeleteOptions: boolean;
}

type optionPosition = {
  x: number;
  y: number;
};

type StyledProps = {
  bg: string;
  isSelected: boolean;
};

const ConversationItem: React.FC<MessageComponentProps> = ({
  name,
  message,
  unreadNumber,
  time,
  profil,
  handleClick,
  isSelected,
  bg,
}) => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const convRef = useRef<HTMLDivElement>(null);
  //const optionsRef = useRef<HTMLDivElement>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const handleDeleteConv = () => {};

  //comportements
  const handleClickRight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setClickPosition({ x: e.clientX, y: e.clientY });
    setShowDeleteOptions(true);
  };
  useEffect(() => {
    // Function to detect click outside of component
    const handleClickOutside = (e: MouseEvent) => {
      if (convRef.current && !convRef.current.contains(e.target as Node)) {
        setShowDeleteOptions(false);
      }
    };

    addEventListener("mousedown", handleClickOutside);
    return () => removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <ConversationContainer
        onClick={handleClick}
        bg={bg}
        isSelected={isSelected}
        onContextMenu={handleClickRight}
        ref={convRef}
      >
        <UserPhotoAndMessage>
          <div>
            <Avatar imageUrl={profil} />
          </div>
          <div className="name-message-author">
            <p className="name">{name}</p>
            <p className="message">{message}</p>
          </div>
        </UserPhotoAndMessage>

        <div className="time-and-messages-unread">
          <small>{time}</small>
          {unreadNumber > 0 && <p>{unreadNumber}</p>}
        </div>
        {showDeleteOptions && (
          <ShowOptions x={clickPosition.x} y={clickPosition.y}>
            <div onClick={handleDeleteConv} className="options">
              <MdOutlineMarkEmailUnread size={20} color="#FFF" />
              <div>Mark as unread</div>
            </div>
            <div onClick={handleDeleteConv} className="options">
              <MdDeleteOutline size={20} color="#FFF" />
              <div>Delete</div>
            </div>
            <div onClick={handleDeleteConv} className="options">
              <AiOutlineClear size={20} color="#FFF" />
              <div>Clear all messages</div>
            </div>
            <div onClick={handleDeleteConv} className="options">
              <LuArchive size={20} color="#FFF" />
              <div>Archive</div>
            </div>
          </ShowOptions>
        )}
      </ConversationContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ConversationContainer = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  width: 90%;
  position: relative;
  gap: 5px;
  border-radius: 14px;
  background-color: ${(props) =>
    props.isSelected ? "#454950" : "transparent"};
  //margin-bottom: 10px;
  margin-top: 10px;
  user-select: none;
  &:hover {
    background: #454950;
    cursor: pointer;
  }
  .name-message-author {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .name {
      color: ${(props) => (props.isSelected ? "#d8d8d8" : "#6b7c85")};
      font-family: "Work Sans";
      font-size: 0.9rem;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: -0.5px;
    }
    .message {
      color: ${(props) => (props.isSelected ? "#d8d8d8" : "#6b7c85")};
      font-family: Work Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.4px;
    }
  }
  .time-and-messages-unread {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    gap: 10px;
  }
  .time-and-messages-unread p {
    border-radius: 10px;

    background: #f83f3f;
    text-align: center;
    padding: 5px;
    color: #d8d8d8;
    font-family: "Work Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .time-and-messages-unread small {
    color: ${(props) => (props.isSelected ? "#d8d8d8" : "#6b7c85")};
    font-family: "Work Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.35px;
  }
`;

const UserPhotoAndMessage = styled.div`
  display: flex;
  gap: 10px;
`;

const ShowOptions = styled.div<optionPosition>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  //flex: 1;
  width: 200px;
  padding: 10px;
  gap: 10px;
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background-color: #292b2d;
  border-radius: 5px;
  color: #fff;
  font-family: "Work Sans";
  z-index: 2;

  .options {
    display: flex;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    gap: 5px;

    &:hover {
      background-color: #5865f2;
    }
  }
`;

export default ConversationItem;
