import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import "../../output.css";
import IconStandard from "../../components/IconStandard";
import { IoArrowBack } from "react-icons/io5";
import profile from "../../assets/images/profile__default.jpg";
import EditProfileComponent from "./EditProfileComponent";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getIdCurrentUser } from "../../../utils/getIdCurrentUser";
import { getUserInfo } from "../../redux/PersonalDataFromUser/userInfo.action";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import styles from "./profile.module.css";
import { InfoUserComponent } from "./InfoUserComponent";
//import axios from "axios";

interface PropsStyled {
  isClicked: boolean;
}
interface PropsProfile {
  isClicked: boolean;
  handleClickBack: React.MouseEventHandler<HTMLDivElement>;
}

const ProfileUser: FC<PropsProfile> = ({ isClicked, handleClickBack }) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const id = getIdCurrentUser(JSON.stringify(localStorage.getItem("token")));

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [dispatch, id]);
  console.log(user);

  const [imgHover, setImgHover] = useState<boolean>(false);
  const mouseOverHandler = () => {
    setImgHover(true);
  };
  const mouseLeaveHandler = () => {
    setImgHover(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <ProfileUserStyled isClicked={isClicked}>
      <div className="header__profile">
        <div className="header__content">
          <IconStandard
            Icon={IoArrowBack}
            size={24}
            color={"#FFF"}
            handleClick={handleClickBack}
          />
        </div>
      </div>
      <div className="profile__image">
        <div
          className="photo__container"
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <img src={profile} alt="profile" />
          {imgHover && (
            <div className="icon">
              <IconStandard Icon={FaCamera} size={24} /> CHANGE PROFILE PHOTO
            </div>
          )}
        </div>
      </div>
      <div className={styles.logout__div}>
        <div className={styles.logout__button} onClick={logoutHandler}>
          <IconStandard Icon={CiLogout} size={30} color={"#FFF"} /> Logged Out
        </div>
      </div>
      {/*<EditProfileComponent value={"carel Ntsoumou"} />
      <EditProfileComponent value={"tout est bien qui fini bien !"} />*/}

      <InfoUserComponent
        about="tout est bien qui fini bien !"
        username="carel Ntsoumou"
      />
    </ProfileUserStyled>
  );
};

export default ProfileUser;

const ProfileUserStyled = styled.div<PropsStyled>`
  display: flex;
  flex-direction: column;
  width: 100%; /* Largeur du profil, à ajuster selon votre conception */
  height: ${(props) => (props.isClicked ? "100vh" : "100vh")};
  gap: 25px;
  background: #2f3136;
  transition: transform ${(props) => (props.isClicked ? "0.3s" : "0.2s")}
    ease-in-out;
  transform: translateX(${(props) => (props.isClicked ? "0%" : "-100%")});
  position: absolute;
  //top:0;
  z-index: 2;

  .header__profile {
    display: flex;
    align-items: flex-end;
    //gap:18px;
    background: transparent;
    height: 100px;
    padding: 10px 30px;
    width: 100%;
    //flex: 1.5;
  }
  .header__content {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #36393f;
    border-radius: 10px;
    gap: 18px;
    cursor: pointer;
  }
  .label__profile {
    color: #fff;
    font-weight: 600;
    font-family: "Work Sans";
    font-size: 1.2rem;
  }
  .profile__image {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .photo__container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: "Work Sans";
    width: 155px;
    height: 155px;
    border-radius: 155px;
    border: 3px solid #fff;
    cursor: pointer;

    img {
      border-radius: 150px;
      width: 150px;
      height: 150px;
      &:hover {
        filter: brightness(70%); /* Assombrit la photo au survol */
      }
    }

    .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 65%;
      text-align: center;
      color: white;
      font-size: 0.8rem;
      transform: translate(-50%, -50%);
      pointer-events: none;
      user-select: none;
    }
  }
`;
