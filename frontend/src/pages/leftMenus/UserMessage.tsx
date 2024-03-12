import React from "react";
import styled from "styled-components";
import IconProfilComponent from "../../components/IconProfilComponent";

interface MessageComponentProps {
  name: string;
  message: string;
  unreadNumber: number;
  time: string;
  profil: string;
  isSelected: boolean;
  bg: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

type StyledProps = {
  bg: string;
  isSelected: boolean;
};

const UserMessage: React.FC<MessageComponentProps> = ({
  name,
  message,
  unreadNumber,
  time,
  profil,
  handleClick,
  isSelected,
  bg,
}) => {
  return (
    <UserMessageStyled
      onClick={handleClick}
      bg={bg}
      isSelected={isSelected}
      onContextMenu={(event) => {
        event.preventDefault();
        alert("salut");
      }}
    >
      <UserPhotoAndMessage>
        <div>
          <IconProfilComponent imageUrl={profil} />
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
    </UserMessageStyled>
  );
};

const UserMessageStyled = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  width: 90%;
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

export default UserMessage;
