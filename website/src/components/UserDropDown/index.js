//  will route to white modal will popup for the user to use
import React , { Component } from 'react';
import { TabContent,Collapse, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, CardTitle, CardText, Row, Col,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button, Modal, ModalHeader, ModalFooter,InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,Input,FormGroup,Label } from 'reactstrap';
import classnames from 'classnames';
import { LogoutLink } from '../Logout'
import { withParse } from '../parse';
import  CashierPage from './Cashier';
import  AccountPage from './Account';
import './index.css';
var QRCode = require('qrcode');
export class UserDropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            ModalComponent : null,
        }
    }
    toggleModal(element){
        if(element == null ){
            element = this.state.ModalComponent
        }
        this.setState({
            isOpen : !this.state.isOpen,
            ModalComponent : element
        })
    }
    render(){
        let iconStyle= {
            height : "1.5rem",
            width : "1.5rem",
            marginRight :" 0.5rem"
        }
        var _this = this;
        const { isOpen, ModalComponent } = this.state;
       return (
           <div >
               <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle tag="a" className="nav-link" caret style={{color:"white", cursor:"pointer"}}>
                    username
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem
                        onClick={()=>{
                            _this.toggleModal(CashierPage);
                        }}
                    >
                        <img src={require('./icons/coins.svg')} style={iconStyle} />
                        Cashier
                    </DropdownItem>
                    <DropdownItem
                    
                    onClick={()=>{
                        _this.toggleModal(AccountPage);
                    }}>
                    <img src={require('./icons/person.svg')} style={iconStyle} />
                        Account
                    </DropdownItem>
                    <DropdownItem>
                    <img src={require('./icons/affiliate.svg')} style={iconStyle} />
                        Affiliate
                    </DropdownItem>
                    <DropdownItem>
                    <img src={require('./icons/history.svg')} style={iconStyle} />
                        History
                    </DropdownItem>
                    <DropdownItem>
                    <img src={require('./icons/support.svg')} style={iconStyle} />
                        Live Support
                    </DropdownItem>
                    
                        <LogoutLink>
                            <img src={require('./icons/logout.svg')} style={iconStyle} />
                            Logout
                        </LogoutLink>
                    
                    
                </DropdownMenu>
                </UncontrolledDropdown>






                <Modal style={{maxWidth : "600px"}} centered isOpen={isOpen} toggle={()=>{_this.toggleModal()}} className={""}>
                    <ModalHeader toggle={()=>{
                        _this.toggleModal()
                    }}>Cashier</ModalHeader>
                        
                      < ModalComponent />     
                        
                    
                </Modal>
           </div>   
        
       ) 
    }
}


