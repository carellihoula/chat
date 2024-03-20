import React from 'react'
import styled from 'styled-components'
import {getJustifyContent} from '../../../utils/getJustifyContent.ts'

type DividerProps = {
    justifyBorder: 'full'|'center'|'left'|'right'  
}
type DividerComponentStyledProps = {
    justifyBorder: 'full'|'center'|'left'|'right'  
}

type Props = {
    justifyBorder: 'full'|'center'|'left'|'right'
}

const DividerComponent:React.FC<Props> = ({justifyBorder}) => {
  
  return (
    <DividerComponentStyled justifyBorder={justifyBorder}>
        <Divider justifyBorder = {justifyBorder}>
        </Divider>
    </DividerComponentStyled>
  )
}

const DividerComponentStyled = styled.div<DividerComponentStyledProps>`
display: flex;
justify-content: ${props => getJustifyContent(props.justifyBorder)};
width: 100%;

`

const Divider = styled.div<DividerProps>`
display: flex;
background: #E9EDEF;
height: 1px;
width: ${props => props.justifyBorder === 'full' ? '100%' : props.justifyBorder ==='center' ? '90%' :'85%'};

`

export default DividerComponent
