import React from 'react'
import styled from 'styled-components'
import sideButton from '../assets/sidebutton.svg'

export default function NavbarButton() {
  console.log(sideButton, 'sideButton');
  return (
    <SideBarButton src={sideButton}/>
  )
}


export const SideBarButton = styled.img`
width: 24px;
height: 24px;
margin-top: 30px;
`;