import { FC } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import IconStandard from "../common/IconStandard.tsx";

interface Props {
  icon: IconType | string;
  label: string;
  color?: string;
}
const ButtonAuth2Component: FC<Props> = ({ icon, label, color }) => {
  return (
    <ButtonAuthStyled>
      <IconStandard Icon={icon} size={24} color={color} />
      <div className="common label">
        Login with <span>{label}</span>
      </div>
    </ButtonAuthStyled>
  );
};

export default ButtonAuth2Component;

const ButtonAuthStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: 1px solid #fff;
  //border: 1px solid #f0edff;
  width: 364px;
  height: 52px;
  flex-shrink: 0;
  gap: 8px;
  cursor: not-allowed;

  .common {
    color: #fff;
    font-family: "Poppins";
    font-size: 0.8rem;
    font-style: normal;
    line-height: normal;
  }
  span {
    font-weight: 700;
  }
  label {
    font-weight: 400;
  }
`;
