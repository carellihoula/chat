import {FC} from 'react'
import styled from "styled-components"
//import { LiaSmsSolid } from "react-icons/lia";
import { IconType } from 'react-icons';


type IconStandardProps = {
    Icon:IconType|string;
    size?:number;
    color?:string;

}
const IconStandard: FC<IconStandardProps> = ({Icon,size,color="#54656F"}) => {
  return (
    <IconStandardStyled>
        {typeof Icon === "string" ? (
            <img src={Icon} alt="imageIcon" style={{width: size, height: size}} />
        ):(Icon && <Icon size={size} color={color} />)
        }
    </IconStandardStyled>
  )
}

const IconStandardStyled = styled.div`



`

export default IconStandard
