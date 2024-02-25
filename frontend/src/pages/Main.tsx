import { FC } from "react";
import LeftSideOfMain from "./leftMenus/LeftSideOfMain";
import RightSideOfMain from "./rigntConversations/RightSideOfMain";
import styled from "styled-components";

const Main: FC = () => {
  console.log(localStorage.getItem("token"));
  return (
    <MainStyled>
      <LeftSideOfMain />
      <RightSideOfMain />
    </MainStyled>
  );
};

const MainStyled = styled.div`
  display: flex;
  //flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export default Main;
