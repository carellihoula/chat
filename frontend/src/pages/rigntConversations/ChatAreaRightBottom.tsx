//import React from 'react'
import styled from 'styled-components'
import TextZoneComponent from '../../components/TextZoneComponent'
import IconStandard from '../../components/IconStandard'
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { BiSolidMicrophone } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { useState } from 'react';


interface Props {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const ChatAreaRightBottom = () => {
  const [value, setValue] = useState<string>('')
  const [textAreaHeight, setTextAreaHeight] = useState<string|number>('')

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto')
    setValue(e.target.value)
  }

  const handleResizeHeight = (e:React.UIEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight(e.currentTarget.scrollHeight)
  }

  console.log(value)

  return (
    <ChatAreaRightBottomStyled>
      <ContainerComponent >
        <IconStandard size={24} Icon={BsEmojiSmile}/>
        <IconStandard size={24} Icon={GrAttachment}/>
        <TextZoneComponent value={value} handleChange={handleChange}
        handleResizeHeight = {handleResizeHeight} textAreaHeight={textAreaHeight}
        />
        {
          value ? (<VscSend size={24} Icon={BiSolidMicrophone}/>):
          (<IconStandard size={24} Icon={BiSolidMicrophone}/>)
        }
        
      </ContainerComponent>      
    </ChatAreaRightBottomStyled>
  )
}

const ChatAreaRightBottomStyled = styled.div`
display:flex;
align-items: center;
justify-content:center;
background: #F0F2F5;
width: 100%;
height: 90px;
position: absolute;
bottom: 0; 
`

const ContainerComponent = styled.div`
display: flex;
align-items: center;
//justify-content: center;
gap:25px;

`

export default ChatAreaRightBottom
