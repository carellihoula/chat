import  { FC } from 'react'
import styled from 'styled-components'
import IconProfilComponent from '../../components/IconProfilComponent'
import IconStandard from '../../components/IconStandard'
import { FiMoreVertical } from "react-icons/fi";
import { MdLocalPhone } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import profileImage from '../../assets/images/Ellipse4.png'

const HeaderRight: FC = () => {
  return (
    <NavLeftStyled>
       <IconProfilComponent imageUrl={profileImage}/>

       <IconDiv>
            <IconStandard size={24} Icon={MdLocalPhone}/>
            <IconStandard size={24} Icon={IoMdVideocam}/>
            <IconStandard size={24} Icon={IoSearchOutline}/>
            <IconStandard size={24} Icon={FiMoreVertical}/>
       </IconDiv>
       
    </NavLeftStyled>
  )
}

const NavLeftStyled = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px;
background: #F0F2F5;
width: 100%;
height: 74px; 

`
const IconDiv = styled.div`
display: flex;
align-items: center;
gap:25px;

`

export default HeaderRight;
