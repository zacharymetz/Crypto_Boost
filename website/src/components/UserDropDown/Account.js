
//  will route to white modal will popup for the user to use
import React , { Component } from 'react';
import { TabContent,Collapse, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, CardTitle, CardText, Row, Col,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button, Modal, ModalHeader, ModalFooter,InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,Input,FormGroup,Label ,FormText} from 'reactstrap';
import classnames from 'classnames';
import { LogoutLink } from '../Logout'
import { withParse } from '../parse';
import Switch from "react-switch";
var QRCode = require('qrcode')





export default class AccountPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageTitle : "General",
            PageComponent : GeneralAccountPage
        }
    }
    setPage(title,component){
        this.setState({
            pageTitle : title,
            PageComponent : component
        })
    }
    render(){
        var _this = this;
        const { pageTitle, PageComponent} = this.state;
        return (
        <div className="account-page-wrapper">
            <div className="account-page-nav">
                <AccountNavItem
                    onClick={()=>{
                        _this.setPage("General",GeneralAccountPage)
                    }}
                    selected={pageTitle == "General"}
                >
                    General
                </AccountNavItem>
                <AccountNavItem
                    onClick={()=>{
                        _this.setPage("Security",SecurityPage)
                    }}
                    selected={pageTitle == "Security"}
                >
                    Security
                </AccountNavItem>
                <AccountNavItem
                    onClick={()=>{
                        _this.setPage("Privacy",PrivacyPage)
                    }}
                    selected={pageTitle == "Privacy"}
                >
                    Privacy
                </AccountNavItem>
                <AccountNavItem
                    onClick={()=>{
                        _this.setPage("Verification",VerificationPage)
                    }}
                    selected={pageTitle == "Verification"}
                >
                    Verification
                </AccountNavItem>
                
            </div>
            <div className="account-page-content">
                    < PageComponent />
            </div>
        </div>
        )
    }
}

const AccountNavItem = (props) => {

    let style = {

    }
    if(props.selected){
        style = {
            borderRight : "3px solid black"
        }
    }


    return (
        <div className="account-page-nav-item"
            style={style}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}



class GeneralAccountPage extends Component{
    render(){
        return(
        <div>
            <ContentSection title={"Referrer"}>
            
            </ContentSection>
            <ContentSection title={"Alternate Login Methods"}>
                <p className="text-muted">Login even faster by connecting your account to one or more of the available services below</p>
            </ContentSection>
        </div>
        )
    }
}

class SecurityPageBase extends Component{
    render(){
        const twoFactorAuth = false;
        var _this = this;
        return(
        <div>
            <ContentSection title={"Recovery"}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    />
                </FormGroup>
                <div style={{textAlign : "right"}}>
                    <Button color="link">Update Email</Button>
                </div>
            </ContentSection>
            <ContentSection title={"Change Password"}>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder=""
                    />
                    
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password Confirmation</Label>
                    <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder=""
                    />
                </FormGroup>
                <div style={{textAlign : "right"}}>
                    <Button color="link">Change Password</Button>
                </div>
            </ContentSection>
            <ContentSection title={"Two-factor Authentication"}>
                <SwitchElement 
                    title={"Enable Two-factor Authentication"}
                    name={"twoFactorAuth"}
                    value={twoFactorAuth}
                    onChange={()=>{_this.handleSwitchChange("twoFactorAuth")}}
                />
                <p className="text-muted">
                Enabling two-factor authentication will require a code when updating or viewing sensitive information
                </p>
            </ContentSection>
            <ContentSection title={"Multi-Device Logout"}>
                <p className="text-muted">
                If you think your account may have been compromised, reset your password and then hit the button below to end all current active sessions including this one.
                </p>
                <div style={{textAlign : "right"}}>
                <Button color="link">View Recent Sessions</Button> <Button color="link">Logout Everywhere</Button>
                </div>
            </ContentSection>
        </div>
        )
    }
}

const ContentSection = (props) => {
    return(
        
        <div className="account-content-section">
            <div className="account-content-section-header">
                { props.title }
            </div>
            {props.children}
            < div className="account-content-section-divider" />
        </div>
        
        )
}
class SwitchExample extends Component {
    constructor() {
      super();
      this.state = { checked: false };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(checked) {
      this.setState({ checked });
    }
   
    render() {
      return (
        <label>
          
          <Switch onChange={this.handleChange} checked={this.state.checked} />
        </label>
      );
    }
  }


const SwitchElement = (props) => {
    return (
    <div style={{
        display : "flex",
        alignItems : "center",
        marginBottom : "0.5rem"
    }}>
        <Switch 
            onChange={props.onChange} 
            checked={props.value} 
            uncheckedIcon={false}
            checkedIcon={false}
        />
        <div style={{
            marginLeft :"0.5rem"
        }}>
            {props.title}
        </div>
        
    </div>
    );
}


const SecurityPage = withParse(SecurityPageBase);
class PrivacyPageBase extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayTotalWagers : true,
            displayAmmountWagered : true,
            maskSensitiveInformation : true,
            gameFeed : false,
        }
    }
    handleSwitchChange(name){
        
        this.setState({ [name]: !this.state[name] });
    }

    render(){
        var _this = this;
        const { displayTotalWagers, displayAmmountWagered,maskSensitiveInformation,gameFeed } = this.state;
        return(
        <div>
            <ContentSection title={"Your Profile"}>
                < SwitchElement 
                    title={"Display Total Wagers"}
                    name={"displayTotalWagers"}
                    value={displayTotalWagers}
                    onChange={()=>{_this.handleSwitchChange("displayTotalWagers")}}
                />
                <p className="text-muted">
                Allow other players to view the total amount of wagers you've ever made  
                </p>
                < SwitchElement 
                    title={"Display Ammount Wagered"}
                    name={"displayAmmountWagered"}
                    value={displayAmmountWagered}
                    onChange={()=>{_this.handleSwitchChange("displayAmmountWagered")}}
                />
                <p className="text-muted">
                Allow other players to view your all time wagered amount
                </p>
                < SwitchElement 
                    title={"Mask Sensitive Information"}
                    name={"maskSensitiveInformation"}
                    value={maskSensitiveInformation}
                    onChange={()=>{_this.handleSwitchChange("maskSensitiveInformation")}}
                />
                <p className="text-muted">
                Mask your personal settings (e.g. your email on your account settings). Perfect for content creators wanting to hide personal information from their videos.
                </p>
            </ContentSection>
            <ContentSection title={"Game Feed"}>
            
                < SwitchElement 
                    title={"Incognito Mode"}
                    name={"gameFeed"}
                    value={gameFeed}
                    onChange={()=>{_this.handleSwitchChange("gameFeed")}}
                />
                <p className="text-muted">
                    Hide your identity when placing a bet and when being displayed on the live game feed
                </p>
            </ContentSection>
            <ContentSection title={"Account Closure"}>
            <p className="text-muted">
            You may close your account by clicking the "Close My Account" button below. All of your data will be permanently wiped and cannot be restored in the future (Including any VIP perks).
                </p>
            <div style={{textAlign : "right"}}>
            
                <Button color="link">Close Account</Button> 
                </div>
            </ContentSection>
        </div>
        )
    }
}















const PrivacyPage = withParse(PrivacyPageBase);
class VerificationPageBase extends Component{
    render(){
        return(
        <div>
            <ContentSection title={"Personal Info"}>
                <FormGroup>
                    <Label for="examplePassword">Name</Label>
                    <Input
                    type="text"
                    name="password"
                    id="examplePassword"
                    placeholder="Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleDatetime">Date Of Birth</Label>
                    <Input
                    type="datetime"
                    name="datetime"
                    id="exampleDatetime"
                    placeholder="datetime placeholder"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Country</Label>
                    <Input type="select" name="select" id="exampleSelect">
                    <option>Canada</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Input>
                </FormGroup>
            </ContentSection>
            <ContentSection title={"Documents"}>
                <p>
                Please upload two documents below. For Proof of Identity, please send us a photo of either of your ID card, driver's license or passport. For Proof of Address, please send us a utility bill or similar with your name and address on it from the past 3 months.
                </p>
                <FormGroup style={{display : "flex", alignItems :"middle"}}>
                    <div >
                        <Label for="exampleFile">Proof Of Identity</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            File types accepted: .png, .jpg, .pdf
                        </FormText>
                    </div>
                    
                    <div style={{textAlign : "right", flexGrow : 1}}>
                        <Button color="link">Upload File</Button>
                    </div>
                </FormGroup>
                <div >
                        <Label for="exampleFile">Proof Of Address</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            File types accepted: .png, .jpg, .pdf
                        </FormText>
                    </div>
                    
                    <div style={{textAlign : "right", flexGrow : 1}}>
                        <Button color="link">Upload File</Button>
                    </div>
            </ContentSection>
            
        </div>
        )
    }
}
const VerificationPage = withParse(VerificationPageBase);
