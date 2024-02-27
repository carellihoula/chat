import React from "react";
import styled from "styled-components";
import IconProfilComponent from "../../components/IconProfilComponent";
import { LiaEditSolid } from "react-icons/lia";

interface MessageComponentProps {
  name: string;
  profil: string;
  isSelected: boolean;
  bg: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

type StyledProps = {
  bg: string;
  isSelected: boolean;
};

export const UserComponent: React.FC<MessageComponentProps> = ({
  name,
  profil,
  handleClick,
  isSelected,
  bg,
}) => {
  return (
    <UserMessageStyled onClick={handleClick} bg={bg} isSelected={isSelected}>
      <div>
        <IconProfilComponent imageUrl={profil} />
      </div>
      <div className="name-message-author">
        <div>{name}</div>
        <div>
          <LiaEditSolid size={20} color="#FFF" />
        </div>
      </div>
    </UserMessageStyled>
  );
};

const UserMessageStyled = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  align-self: center;
  width: 90%;
  gap: 5px;
  border-radius: 14px;
  background-color: ${(props) => props.bg};
  //margin-bottom: 10px;
  margin-top: 10px;
  user-select: none;
  &:hover {
    background: #454950;
    cursor: pointer;
  }
  .name-message-author {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    justify-content: space-between;
    color: ${(props) => (props.isSelected ? "#d8d8d8" : "#6b7c85")};
    font-family: "Work Sans";
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.5px;
  }
`;
