import React , { Component } from 'react';
import './landing.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, CardTitle, CardText, Row, Col,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  BoostGame  from '../boostGame'

import Navigation from '../Navigation'
export default  (props) =>{
    return(
    <div>
       
        <div className="container main-brand-wrapper">
            < BoostGame />    
        </div>
            
    </div>)
}

