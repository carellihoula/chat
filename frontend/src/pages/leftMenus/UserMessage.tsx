import React from 'react'
import styled from 'styled-components'
import profileImage from '../../assets/images/profileIcon.png'
import IconProfilComponent from '../../components/IconProfilComponent'

interface MessageComponentProps{
    name: string;
    message: string;
    unreadNumber: number;
    time: string;
    handleConversation: React.MouseEventHandler<HTMLDivElement> 
}

const UserMessage:React.FC<MessageComponentProps> = ({name, message, unreadNumber, time,handleConversation }) => {
  return (
    <UserMessageStyled onClick={handleConversation}>
        <UserPhotoAndMessage>
            <div>
            <IconProfilComponent imageUrl={profileImage}/>
            </div>
            <div className='name-message-author'>
                <p className="name">{name}</p>
                <p className="message">{message}</p>
            </div>
        </UserPhotoAndMessage>
        
        <div className='time-and-messages-unread'>
            <small>{time}</small>
            <p>{unreadNumber}</p>
        </div>
      
    </UserMessageStyled>
  )
}

const UserMessageStyled = styled.div`
display: flex;
justify-content: space-between;
padding : 10px 15px;
align-items: center;
gap:15px;
//margin-bottom: 10px;
//margin-top: 10px;
&:hover{
    background: #f0f2f5;
    cursor: pointer;
}
.name-message-author{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    .name{
        color: var(--Color-3, #6B7C85);
        font-family: 'Work Sans';
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.5px;
    }
    .message{
        color: var(--Color-3, #6B7C85);
        font-family: Work Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.4px;
    }
}
.time-and-messages-unread{
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    gap: 10px;
}
.time-and-messages-unread p{
    border-radius: 10px;
    background: var(--Green-1, #25D366);
    text-align: center;
    padding: 5px; 
    color: #FFF;
    font-family: 'Work Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.time-and-messages-unread small{
    color: var(--Color-3, #6B7C85);
    font-family: 'Work Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.35px;
}
`

const UserPhotoAndMessage = styled.div`
display: flex;
gap: 10px;

`

export default UserMessage
