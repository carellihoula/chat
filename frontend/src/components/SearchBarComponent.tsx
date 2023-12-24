import React from 'react'
import styled from 'styled-components'
import IconStandard from './IconStandard'
import { IoSearchOutline } from 'react-icons/io5'
import { MdArrowBack } from 'react-icons/md';

interface SearchProps {
    value: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}


const SearchBarComponent: React.FC<SearchProps> = ({value,handleChange}) => {
  return (
    <SearchBarComponentStyled>
        {
            value ? (<IconStandard Icon={MdArrowBack} size={24} />) 
            :  (<IconStandard Icon={IoSearchOutline} size={24}/>)
        }
        <input type="text" placeholder='Search or start new chat'
        value={value}
        onChange={handleChange}
        />
    </SearchBarComponentStyled>
  )
}

const SearchBarComponentStyled = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 420px;
height: 50px;
padding: 15px 20px;
align-items: flex-start;
gap: 10px;
border-radius: 10px;
background: #F0F2F5;

input[type="text"]{
display: flex;
align-self: center;
width: 420px;
height: 50px;
padding: 15px 20px;
align-items: flex-start;
border-radius: 10px;
background: #F0F2F5;
border-style: none;
outline: none;
font-family: 'Work Sans';
font-size: 14px;
font-style: normal;
font-weight: 500; 
}

`


export default SearchBarComponent
