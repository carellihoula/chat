import {FC} from 'react'
import styled from "styled-components"

type Props = {
    imageUrl: string
}

const IconProfilComponent: FC<Props> = ({imageUrl}) => {

  return (
    <IconProfilComponentStyled>
        <img src ={imageUrl} alt="profile"/>
    </IconProfilComponentStyled>
  )
}
const IconProfilComponentStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 2px solid #FFF ;
    width: 55px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
`

export default IconProfilComponent
