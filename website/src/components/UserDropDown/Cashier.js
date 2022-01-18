
//  will route to white modal will popup for the user to use
import React , { Component } from 'react';
import { TabContent,Collapse, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, CardTitle, CardText, Row, Col,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button, Modal, ModalHeader, ModalFooter,InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,Input,FormGroup,Label } from 'reactstrap';
import classnames from 'classnames';
import { LogoutLink } from '../Logout'
import { withParse } from '../parse';
var QRCode = require('qrcode')




export default class CashierPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1',
            isOpen : false
        }
    }
    toggle(tab){
        this.setState({
            activeTab : tab
        })
    }
    
    render(){
        var _this = this;
        const { activeTab, isOpen } = this.state;
        return (
        <div style={{marginTop:"1rem"}}>
            <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { _this.toggle('1'); }}
          >
            Deposit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { _this.toggle('2'); }}
          >
            Withdraw
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            < CryptoDepositPage />
        </TabPane>
        <TabPane tabId="2">
            < CryptoWithDrawPage />
        </TabPane>
      </TabContent>
    
        </div>
        )
    }
}

function CryptoDepositPage(props){
    return (
        <div style={{padding:"1rem"}}>
            <ListGroup>
                <CryptoDepositItem
                    name="Bitcoin"
                    icon={require("../boostGame/icons/Bitcoin.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"BTC"}
                    confirmations={2}
                />
                <CryptoDepositItem
                    name="Litecoin"
                    icon={require("../boostGame/icons/litecoin.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"LTC"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="Dogecoin"
                    icon={require("../boostGame/icons/dogecoin.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"DOGE"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="Ethereum"
                    icon={require("../boostGame/icons/ethereum.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"ETH"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="Basic Attention Token"
                    icon={require("../boostGame/icons/BAT.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"BAT"}
                    confirmations={1}
                />
                <CryptoDepositItem
                    name="EOS"
                    icon={require("../boostGame/icons/eos.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"EOS"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="XRP"
                    icon={require("../boostGame/icons/XRP.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"XRP"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="Monero"
                    icon={require("../boostGame/icons/monero.svg")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"XMR"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="OSRS Gold"
                    icon={require("../boostGame/icons/betacoin.png")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"OSG"}
                    confirmations={4}
                />
                <CryptoDepositItem
                    name="EVE Online ISK"
                    icon={require("../boostGame/icons/isk.png")} 
                    address={"1MD29dQuEVQHEfC7wZY6Tfk5mM1iHDFRUN"}
                    currency={"ISK"}
                    confirmations={4}
                />
            </ListGroup>
        </div>
    )
}


class CryptoDepositItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false
        }
    }
    toggleCollapse(){
        this.setState({
            isOpen : !this.state.isOpen
        });
        console.log("toggeliong")
    }
    render(){
        const { isOpen } = this.state;
        const { name, icon, address, currency, confirmations } = this.props;
        console.log(isOpen)
        var _this = this
        return (
            <ListGroupItem>
            <div onClick={()=>{
                _this.toggleCollapse()
            }}
            style={{
                cursor: "pointer",
                fontSize : "1.25rem",
                fontWeight: 600,
                display : "flex",
                alignItems : "center"
            }}
            >
                <img 
                    style={{
                        height: "2rem",
                        marginRight : "0.5rem"
                    }}
                    src={icon}
                />
                {name}
            </div>
            
        
            <Collapse 
            
            isOpen={isOpen}>
                <div style={{ display : "flex", alignItems : "center"}}>
                <div 
                    style={{}}
                >
                    < QRCodeDisplay data={address}  />
                    </div>
                    <div
                    style={{ flexGrow : 1}}
                    >
                        <div className="text-muted" style={{fontSize: "0.9rem"}}>
                            Your {name} Address : 
                        </div>
                        <div style={{fontWeight : 600, margin:"0.75rem 0"}}>
                            {address}
                        </div>
                        <div className="text-muted" style={{fontSize: "0.9rem"}}>
                            Send Any Ammount Of {currency} to the following address. 
                            Please wait for {confirmations} before your account is credited.
                        </div>
                        <div style={{
                            marginTop : "0.5rem",
                            textAlign : "right"
                        }} >
                            <Button outline color="primary" size="sm">Get New Address</Button>
                        </div>

                    </div>
                </div>
            
            </Collapse>
        </ListGroupItem>
        )
    }
}


class CryptoWithDrawPage extends Component{
    render(){
        return (
            <div style={{padding:"1rem"}}>
            <ListGroup>
                <CryptoWithdrawItem
                    name="Bitcoin"
                    icon={require("../boostGame/icons/Bitcoin.svg")} 
                    currency={"BTC"}
                />
                <CryptoWithdrawItem
                    name="Litecoin"
                    icon={require("../boostGame/icons/litecoin.svg")} 
                    currency={"LTC"}
                />
                <CryptoWithdrawItem
                    name="Dogecoin"
                    icon={require("../boostGame/icons/dogecoin.svg")} 
                    currency={"DOGE"}
                />
            </ListGroup>
        </div>
        )
    }
}
class CryptoWithdrawItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false
        }
    }
    toggleCollapse(){
        this.setState({
            isOpen : !this.state.isOpen
        });
        console.log("toggeliong")
    }
    render(){
        const { isOpen } = this.state;
        const { name, icon, address, currency, confirmations } = this.props;
        console.log(isOpen)
        var _this = this
        return (
            <ListGroupItem>
            <div onClick={()=>{
                _this.toggleCollapse()
            }}
            style={{
                cursor: "pointer",
                fontSize : "1.25rem",
                fontWeight: 600,
                display : "flex",
                alignItems : "center"
            }}
            >
                <img 
                    style={{
                        height: "2rem",
                        marginRight : "0.5rem"
                    }}
                    src={icon}
                />
                {name}
            </div>
            
        
            <Collapse 
            
            isOpen={isOpen}>
                <div style={{ display : "flex", alignItems : "center"}}>
                
                    <div
                    style={{ flexGrow : 1}}
                    >
                        < WithDrawForm />
                    </div>
                </div>
            
            </Collapse>
        </ListGroupItem>
        )
    }
}


class WithDrawFormBase extends Component{
    constructor(props){
        super(props)
        this.state = {
                ammount : 0,
                address : "",

        }
    }
    onChange(e){

    }
    onSubmit(e){
        
    }
    render(){
        const { ammount, address } = this.state;
        return (
        <div>
             <FormGroup>
                <Label for="exampleEmail">Ammount</Label>
                <InputGroup>
                    
                    <Input 
                        placeholder="and..." 
                    />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">Min</Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">1/2</Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">Min</Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Address</Label>
                <Input 
                    type="text" 
                    name="email" 
                    id="exampleEmail" 
                    placeholder="with a placeholder" 
                />
            </FormGroup>
            <div
                style={{
                    padding: "0.5rem 0",
                    textAlign : "right"
                }}
            >
                <Button outline color="primary" size="sm">Withdraw</Button>
            </div>
            <div className="text-muted" style={{
                    textAlign : "right",
                    fontSize : "0.8rem"
                }}>
                No Minimum Withdrawl, Transaction Fee is $4
            </div>
        </div>
        )
    }
}
const WithDrawForm = withParse(WithDrawFormBase);



class QRCodeDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : uuidv4()+ "-qrcode"
        }
    }
    componentDidMount() {
        const { data } = this.props;
        console.log(data)
        var canvas  = document.getElementById(this.state.id); 
        console.log(this.state.id)
        QRCode.toCanvas(canvas
                , data, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    render(){
        const { style, data } = this.props; 
        const { id } = this.state;
        return (
        <div>
            <canvas id={id} style={style}>

            </canvas>
        </div>
        )
    }
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }