import {FC, useEffect, useRef} from 'react'
import styled from 'styled-components'
import HeaderRight from './HeaderRight'
import ChatAreaRightBottom from './ChatAreaRightBottom'
import bg from '../../assets/images/backgroundWhatsapp.jpeg'
import MessageComponent from '../../components/MessageComponent'
import {conversations} from '../../../utils/ListOfConversations'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import ScrollToBottom from 'react-scroll-to-bottom';

interface ConversationAreaProps {
  isSender: boolean
}


const RightSideOfMain: FC = () => {
  const conversationActive = useSelector((state: RootState ) => state.convOpened.selectedConversation)
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      if(conversationRef && conversationRef.current){
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }
  },[conversations])

  return (
    <RightSideOfMainStyle>
      <HeaderRight />
      <ConversationArea ref={conversationRef}>
          {
            conversations[conversationActive.conversationId-1].messages.map((msg,index) =>{
              const time = new Date(msg.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
              return (
                <StyledMessageComponent isSender={msg.isSender} key={index}>
                  <MessageComponent isSender={msg.isSender} message={msg.text} time={time}/>
                </StyledMessageComponent>
              )
            })
          }
          
      </ConversationArea>
      <ChatAreaRightBottom />
    </RightSideOfMainStyle>
  )
}

const RightSideOfMainStyle = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${bg}), lightgray 50% / cover no-repeat;
    width: 70%;
    height: 100vh;
    position: relative;
`

const ConversationArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    overflow-y: scroll;
    margin-bottom: 100px;
    
    
    
`

const StyledMessageComponent = styled.div<ConversationAreaProps>`
    align-self: ${props => props.isSender ? 'flex-start' : 'flex-end'};
    /* Autres styles pour le composant MessageComponent */
`;

export default RightSideOfMain
