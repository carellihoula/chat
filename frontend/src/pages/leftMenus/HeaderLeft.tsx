import  { FC } from 'react'
import styled from 'styled-components'
import IconProfilComponent from '../../components/IconProfilComponent'
import IconStandard from '../../components/IconStandard'
import { LiaSmsSolid } from "react-icons/lia"
import { FiMoreVertical } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import iconStatus from '../../assets/images/StatusIcon.png'
import profileImage from '../../assets/images/profileIcon.png'

interface Props {
  ProfileClickHandler: React.MouseEventHandler<HTMLDivElement>
}

const HeaderLeft: FC<Props> = ({ProfileClickHandler}) => {

  return (
    <NavLeftStyled>
       <IconProfilComponent imageUrl={profileImage} ProfileClickHandler={ProfileClickHandler}/>

       <IconDiv>
            <IconStandard size={24} Icon={MdGroups}/>
            <IconStandard size={24} Icon={iconStatus}/>
            <IconStandard size={24} Icon={LiaSmsSolid}/>
            <IconStandard size={24} Icon={FiMoreVertical}/>
       </IconDiv>
       
    </NavLeftStyled>
  )
}

const NavLeftStyled = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background: #F0F2F5;
width: 100%;
height: auto;
padding: 10px 20px; 
border-right: 1px solid #c9cdcf;
`
const IconDiv = styled.div`
display: flex;
align-items: center;
gap:20px;

`

export default HeaderLeft
