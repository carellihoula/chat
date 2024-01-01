import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import IconStandard from '../../components/IconStandard';
import { IoArrowBack } from "react-icons/io5";
import profile from '../../assets/images/profile__default.jpg'
import EditProfileComponent from './EditProfileComponent';
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store'
import { getIdCurrentUser } from '../../../utils/getIdCurrentUser';
import { getUserInfo } from '../../redux/PersonalDataFromUser/userInfo.action';

interface PropsStyled{
    isClicked: boolean;
}
interface PropsProfile {
    isClicked: boolean;
    handleClickBack:React.MouseEventHandler<HTMLDivElement>
}


const ProfileUser:FC<PropsProfile> = ({isClicked,handleClickBack}) => {
    const user = useSelector((state:RootState) => state.user.userInfo)
    const dispatch = useDispatch<AppDispatch>()
    const id = getIdCurrentUser(JSON.stringify(localStorage.getItem('token')));
    
    useEffect(() => {
        dispatch(getUserInfo(id));
    }, [dispatch, id]);
    console.log( user)

    const [imgHover, setImgHover] = useState<boolean>(false)
    const mouseOverHandler = () => {
        setImgHover(true)
    }
    const mouseLeaveHandler = () => {
        setImgHover(false)
    }
  return (
    <ProfileUserStyled isClicked={isClicked}>
        <div className='header__profile'>
            <div className='header__content'>
                <IconStandard Icon={IoArrowBack} size={24} color={"#FFF"} handleClick={handleClickBack}/>
                <p className='label__profile'>Profile</p>
            </div>    
        </div>

        <div className='profile__image'>
            <div className='photo__container' onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
                <img src={profile} alt="profile"/>
                { imgHover && (
                <div className="icon">
                    <IconStandard Icon={FaCamera} size={24}/> CHANGE PROFILE PHOTO
                </div>
                )}
            </div>
        </div>

        <EditProfileComponent label="Your name" value={user?.username}/>

        <div className='information__from__site__to__user'>
            <p>This is not your username or pin. This name will be visible to your CanoShop friends</p>
        </div>

        <EditProfileComponent label="About" 
        value={user?.about}
        />
        
        
    </ProfileUserStyled>
  )
}

export default ProfileUser

const ProfileUserStyled = styled.div<PropsStyled>`
  display: flex;
  flex-direction: column;
  width: 100%; /* Largeur du profil, à ajuster selon votre conception */
  height: ${props => props.isClicked ? '100vh':'100vh'};
  gap:25px;
  background: #F0F2F5;
  transition: transform ${props => props.isClicked ? '0.3s' : '0.2s'} ease-in-out;
  transform: translateX(${props => props.isClicked ? '0%' : '-100%'});
  position: absolute;
  //top:0;
  z-index: 2;

  .header__profile{
    display: flex;
    align-items: flex-end;
    //gap:18px;
    background: #008069;
    height:100px;
    padding:10px 30px;
    width: 100%;
    //flex: 1.5;
  }
.header__content{
    display: flex;
    align-items: center;
    gap:18px
}
.label__profile{
    color:#FFF;
    font-weight: 600;
    font-family: 'Work Sans';
    font-size: 1.2rem;
}
.profile__image{
    display: flex;
    justify-content: center;
    width: 100%;
}

.information__from__site__to__user{
    padding: 5px 28px;
    color:#6d7d87;
    font-family: 'Work Sans';
}

.photo__container{
    position: relative;
    font-family: 'Work Sans';
    width: 220px;
    height: 220px;
    border-radius: 220px; 
    cursor: pointer;

    img{
    border-radius: 220px; 
    width:220px;
    height: 220px;
    &:hover {
        filter: brightness(70%); /* Assombrit la photo au survol */
        }
    }

    .icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:50%;
    left:50%;
    width: 65%;
    text-align: center;
    color: white;
    font-size: 0.8rem;
    transform: translate(-50%, -50%); 
    pointer-events: none;
    user-select:none;
    ;
    }
}

`