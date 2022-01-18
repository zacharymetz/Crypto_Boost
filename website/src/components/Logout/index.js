import React, { Component } from 'react';
import { withParse } from '../parse';
import { DropdownItem } from 'reactstrap'


const LogoutLinkBase = ( props)=>{
    return(
    <DropdownItem href= "#"
    onClick={async()=>{
        console.log("loggin out")
        await props.parse.signOutCurrentUser();
    }}

    >
        {props.children}
    </DropdownItem>)
}

export const LogoutLink = withParse(LogoutLinkBase);