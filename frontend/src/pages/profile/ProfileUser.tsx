import React, { FC } from 'react'
import styled from 'styled-components'

interface PropsStyled{
    isClicked: boolean;
}
interface PropsProfile {
    isClicked: boolean;
    handleClickBack:React.MouseEventHandler<HTMLDivElement>
}

const ProfileUser:FC<PropsProfile> = ({isClicked,handleClickBack}) => {
  return (
    <ProfileUserStyled isClicked={isClicked}>
        <div className='pp btn btn-primary' onClick={handleClickBack}>
            back  
        </div>
    </ProfileUserStyled>
  )
}

export default ProfileUser

const ProfileUserStyled = styled.div<PropsStyled>`

  width: 100%; /* Largeur du profil, à ajuster selon votre conception */
  height: ${props => props.isClicked ? '100vh':'100vh'};
  cursor:pointer;
  background-color: #008069;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform ${props => props.isClicked ? '0.3s' : '0.1s'} ease-in-out;
  transform: translateX(${props => props.isClicked ? '0%' : '-100%'});
  position: absolute;


`