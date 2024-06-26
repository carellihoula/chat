import React, { useState } from "react";
import styled from "styled-components";
import IconStandard from "../common/IconStandard.tsx";
import { MdEdit } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import styles from "./profile.module.css";

interface EditProps {
  label?: string;
  value: string;
}

const EditProfileComponent: React.FC<EditProps> = ({ label, value }) => {
  const [showInputField, setShowInputField] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <EditStyled>
      <div className="profile__content">
        {!showInputField ? (
          <>
            <p className="value">{value}</p>
            <IconStandard
              Icon={MdEdit}
              size={18}
              handleClick={() => setShowInputField(true)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder={`type your ${label}`}
              value={inputValue}
              onChange={changeHandler}
              className={styles.input}
              required
            />
            <IconStandard
              Icon={VscSend}
              size={18}
              handleClick={() => setShowInputField(false)}
            />
          </>
        )}
      </div>
    </EditStyled>
  );
};

export default EditProfileComponent;

const EditStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 10px 25px;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  gap: 36px;

  .profile__content {
    display: flex;
    justify-content: space-between;
  }
  .name {
    color: #2b9582;
    font-family: "Work Sans";
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .value {
    color: #546069;
    font-family: "Work Sans";
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
  }
`;
