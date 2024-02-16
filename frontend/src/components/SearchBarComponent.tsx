import React from "react";
import styled from "styled-components";
import IconStandard from "./IconStandard";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";

interface SearchProps {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBarComponent: React.FC<SearchProps> = ({ value, handleChange }) => {
  return (
    <SearchBarComponentStyled>
      <div className="icon">
        {value ? (
          <IconStandard Icon={MdArrowBack} size={24} color="#FFF" />
        ) : (
          <IconStandard Icon={IoSearchOutline} size={24} color="#FFF" />
        )}
      </div>

      <input
        type="text"
        placeholder="Search or start new chat"
        value={value}
        onChange={handleChange}
      />
    </SearchBarComponentStyled>
  );
};

const SearchBarComponentStyled = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 40px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #202225;

  input[type="text"] {
    display: flex;
    align-self: center;
    color: #d8d8d8;
    width: 420px;
    height: 40px;
    padding: 15px 20px;
    align-items: flex-start;
    border-radius: 10px;
    background: #202225;
    border-style: none;
    outline: none;
    font-family: "Work Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .icon {
    display: flex;
    align-self: center;
    pointer-events: none;
  }
`;

export default SearchBarComponent;
