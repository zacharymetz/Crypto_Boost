import React, { Component } from 'react';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../session';
import {UserDropDown} from '../UserDropDown'
import classnames from 'classnames';
import { Modal, ModalHeader,Button, Col, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { LoginModal } from '../Login';
import { SignupModal } from '../Signup';
import { withParse } from '../parse';



const Navigation = (props) =>{
    if(props.parse.parse.User.current()){
        return <NavigationAuth />
    }else{
        return <NavigationNonAuth />
    }
    
} ;
  
const NavigationAuth = () => (

    
    
    <div className="site-nav shadow-lg" >
        <div className="site-nav-brand">
            < div className = "brand-image" />
        </div>
        <div className="site-nav-menu">
            The middle
        </div>
        <div className="site-nav-action">
            < UserDropDown />
        </div>
    </div>
);
  
const NavigationNonAuth = () => (

    <div className="site-nav shadow-lg" >
        <div className="site-nav-brand">
            < div className = "brand-image" />
        </div>
        <div className="site-nav-menu">
            The middle
        </div>
        <div className="site-nav-action">
        < SignupModal />
        < LoginModal />
        
        </div>
    </div>
    
);

export default withParse(Navigation);



