import React, { FC } from 'react'
import styled from 'styled-components'
import IconStandard from './IconStandard'
import { IconType } from 'react-icons'


interface Props{
    icon:IconType|string;
    label:string
}
const ButtonAuth2Component:FC<Props> = ({icon, label}) => {
  return (
    <ButtonAuthStyled>
      <IconStandard Icon={icon} size={24} />
      <div className='common label'>Login with <span >{label}</span></div>
    </ButtonAuthStyled>
  )
}

export default ButtonAuth2Component

const ButtonAuthStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    border: 1px solid #F0EDFF;
    width: 364px;
    height: 52px;
    flex-shrink: 0;
    gap: 8px;
    cursor: pointer;
   
    .common{
        color: #1C1C1C;
    font-family: 'Poppins';
    font-size: 0.8rem;
    font-style: normal;
    line-height: normal;
    }
    span{
        font-weight: 700;
    }
    label{
        font-weight: 400;
    }
`