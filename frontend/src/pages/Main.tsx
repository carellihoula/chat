import { FC } from "react";
import LeftSidebar from "../sidebar/LeftSidebar/LeftSidebar.tsx";
import RightSideOfMain from "../sidebar/RightSidebar/RightSideOfMain";
import styled from "styled-components";

const Main: FC = () => {
  console.log(localStorage.getItem("token"));
  return (
    <MainStyled>
      <LeftSidebar />
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
