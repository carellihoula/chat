import React  from 'react'
import styled from 'styled-components'
import IconStandard from '../../components/IconStandard'
import { MdEdit } from "react-icons/md";

interface EditProps{
    label: string;
    value?: string;
}

const EditProfileComponent:React.FC<EditProps> = ({label, value}) => {
  return (
    <EditStyled>
        <p className='name'>{label}</p>
        <div className='profile__content'>
            <p className='value'>{value}</p>
            <IconStandard Icon={MdEdit} size={18} />
        </div>
    </EditStyled>
  )
}

export default EditProfileComponent

const EditStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 10px 25px;
    flex-shrink: 0;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
    gap: 36px;

    .profile__content{
        display: flex;
        justify-content: space-between;
        
    }
    .name{
        color: #2B9582;
        font-family: 'Work Sans';
        font-size: 0.9rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .value{
        color: #546069;
        font-family: 'Work Sans';
        font-size: 0.9rem;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
    }
`