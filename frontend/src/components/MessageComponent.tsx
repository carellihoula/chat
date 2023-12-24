import styled from "styled-components"
type Props = {
    isSender: boolean;
    message: string;
    time:string
}

type MessageContentProps = {
    sender: boolean;
    
    
}

const MessageComponent:React.FC<Props> = ({isSender, message,time}) => {

  return (
      <MessageContent sender={isSender}>
            <p>{message}</p>
            <small>{time}</small>
      </MessageContent>
    )
}


const MessageContent = styled.div<MessageContentProps>`
    display: flex;
    flex-direction: row;
    max-width: 500px;
    padding: 8px 19px;
    font-family: 'Work Sans';
    align-items: flex-start;
    gap: 10px;
     //20px 20px 2px 20px'
    border-radius:${props => props.sender ? '20px 2px 20px 2px' : '2px 20px 2px 20px'};
    background: ${props => props.sender ? '#FFF':'#d9fdd3'};
    margin-left:-10px;
    margin-bottom: 10px;
    position: relative;
    

    small{
        text-align: right;
        //padding-top:10px;
        //padding-right: 10px;
        position:absolute;
        bottom: 2px;
        right:5px;
        
    }
    p{
        margin-right: 20px;
        font-weight: 600;
    }

`

export default MessageComponent
