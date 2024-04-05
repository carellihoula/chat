import React, { FC } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { LuArchive } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineMarkEmailUnread } from "react-icons/md";
import styled from "styled-components";
import { OptionItemConversation, optionPosition } from "../../types_interfaces";

export const ConversationOptions: FC<optionPosition> = ({
  x,
  y,
  onDeleteHandler,
  onMarkHandler,
  onClearAllHandler,
  onArchiveHandler,
}) => {
  return (
    <ShowOptions x={x} y={y}>
      <OptionItem
        label="Mark as unread"
        Icon={MdOutlineMarkEmailUnread}
        onClickHandler={onMarkHandler}
      />
      <OptionItem
        label="Delete"
        Icon={MdDeleteOutline}
        onClickHandler={onDeleteHandler}
      />
      <OptionItem
        label="Clear All"
        Icon={AiOutlineClear}
        onClickHandler={onClearAllHandler}
      />
      <OptionItem
        label="Archive"
        Icon={LuArchive}
        onClickHandler={onArchiveHandler}
      />
    </ShowOptions>
  );
};

export const OptionItem: FC<OptionItemConversation> = ({
  label,
  Icon,
  onClickHandler,
}) => {
  return (
    <div onClick={onClickHandler} className="options">
      {Icon && <Icon size={20} color="#FFF" />}
      <div>{label}</div>
    </div>
  );
};

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
  background-color: rgba(41, 43, 45, 0.8);
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
