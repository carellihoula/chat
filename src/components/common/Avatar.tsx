import { FC } from "react";
import styled from "styled-components";

type Props = {
  imageUrl?: string;
  ProfileClickHandler?: React.MouseEventHandler<HTMLDivElement>; //() => void
};

export const Avatar: FC<Props> = ({ imageUrl, ProfileClickHandler }) => {
  return (
    <AvatarStyled onClick={ProfileClickHandler}>
      <img src={imageUrl} alt="profile" />
    </AvatarStyled>
  );
};
const AvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 2px solid #fff;
  width: 55px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;

//export default Avatar;
