import React, { Component,useState } from 'react';
import { withParse } from '../parse';
import { Dropdown,Tooltip, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import './sessionHistory.css';
import './header.css';
import './notificationcenter.css'
import { coinList } from '../../constants/coins';



export function Footer(props){
    return (
    <div className="boost-footer" >
        <div className="footer-icon-wrapper" >
            <div  className="game-fullscreen-button" />
        </div>
        <div className="footer-icon-wrapper" >
            <div className="game-expand-button" />
        </div>
        {props.children}
        <div className="footer-disapear" />
            
    </div>
    )
}










export function HistoryBar(props){
    let historyElements = [];
    for(let payout of props.payoutHistory){
        historyElements.push(
            <PayoutHistoryElement
                value={payout}
            />
        )
    }
    return (
    <div  className="session-history-wrapper">
        {historyElements}
    </div>
    )
}


function PayoutHistoryElement(props){
    return(<div className="payout-history-element" >{props.value}x</div>)
} 




export function Header(props){
    //console.log(props)
    return (
    <div className="boost-header">
        <div className="header-icon" >

        </div>
        <div className="boost-header-title" >
            Boost
        </div>
        <div className="boost-header-maxpayout" >
            < MaxProfitIndicator />
            {props.children}
        </div>
    </div>
    )

}

const MaxProfitIndicator = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
  
    const toggle = () => setTooltipOpen(!tooltipOpen);
  
    return (
      <div >
        <div id="TooltipExample" className="boost-header-maxpayout">Max Profit < div className="boost-header-maxpayout-icon" /></div>
        <Tooltip placement="left" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
            <div style={{
                fontSize : "0.75rem",
                color : "rgb(255,255,255,0.5)"
            }}>
                $7000 max Profit
            </div>
        </Tooltip>
      </div>
    );
  }

  export const coins = [
    {
        "name" : "BTC",
        "image" : "Bitcoin.svg",
        "ammount" : 3245.32
    },
    {
        "name" : "BAT",
        "image" : "BAT.svg",
        "ammount" : 3245.32
    },
    {
        "name" : "DOGE",
        "image" : "dogecoin.svg",
        "ammount" : 22.32
    },
    {
        "name" : "EOS",
        "image" : "eos.svg",
        "ammount" : 45.32
    },
    {
        "name" : "ETH",
        "image" : "ethereum.svg",
        "ammount" : 45.32
    },
    {
        "name" : "LTC",
        "image" : "litecoin.svg",
        "ammount" : 3245.32
    },
    {
        "name" : "XMR",
        "image" : "monero.svg",
        "ammount" : 3.32
    },
    {
        "name" : "XRP",
        "image" : "XRP.svg",
        "ammount" : 1.32
    },{
        "name" : "BETA",
        "image" : "betacoin.png",
        "ammount" : 432.34
    }]
export class WalletDropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfCoins : props.coins

            
        }
    }
    
    render(){
        const {selectedCurrency, selectCurrency} = this.props;
        var _this = this;
        const { listOfCoins, dropdownOpen, } = this.state;
        let dropDownItems = []
        let dropdownToggle;
        for(let coin of listOfCoins){
            dropDownItems.push(
                <DropdownItem  color="primary" size="sm"
                    style={{display:"flex", width : "100%",fontWeight:500,alignItems: "center", fontSize : "0.9rem"}}
                    onClick={()=>{
                        selectCurrency( coin)
                    }}
                >
                    <img 
                        src={require("./icons/"+coin.image)}
                        style={{
                            height : "1.5rem",
                            width : "1.5rem",
                            marginRight: "0.5rem"
                        }} 
                    /> 
                    {coin.name} 
                
                    <div 
                    style={{
                        marginright:"0.5rem",
                        fontSize : "0.8rem",
                        flexGrow : 1,
                        marginLeft: "1rem",
                    textAlign : "right",
                    fontWeight : 400
                    }}
                    >
                        ${coin.ammount}
                    </div>
                </DropdownItem>
            )
            if(coin.name == selectedCurrency.name){
                dropdownToggle = (
                    <DropdownToggle caret style={{display:"flex", width : "100%",alignItems: "center", fontSize : "0.9rem", flexWrap : "no-wrap", fontWeight: 600}}
                    
                >
                    <img 
                        src={require("./icons/"+coin.image)}
                        style={{
                            height : "1.5rem",
                            width : "1.5rem",
                            marginRight: "0.5rem"
                        }} 
                    /> 
                    {coin.name} 
                
                    <div 
                    style={{
                        marginright:"0.5rem",
                        fontSize : "0.9rem",
                        flexGrow : 1,
                        marginLeft: "1rem",
                    textAlign : "right",
                    fontWeight : 400
                    }}
                    >
                        ${coin.ammount}
                    </div>
                    </DropdownToggle>
                )
            }
        }

        return (
        
            <Dropdown isOpen={dropdownOpen} size="sm" toggle={()=>{
                _this.setState({
                    dropdownOpen : !dropdownOpen
                })
            }}>
                {dropdownToggle}
                <DropdownMenu right>
                <DropdownItem header>Wallet</DropdownItem>
                    {dropDownItems}
                    <DropdownItem divider />
                    <DropdownItem
                    style={{display:"flex", width : "100%",alignItems: "center", fontSize : "0.9rem", flexWrap : "no-wrap"}}
                    >
                    <img 
                        src={require("./icons/bank.svg")}
                        style={{
                            height : "1.5rem",
                            width : "1.5rem",
                            marginRight: "0.5rem"
                        }} 
                    /> 
                        My Account    
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        
        )
    }
}

export class NotificationCenter extends Component {
    constructor(props){
        super(props);
         //console.log(props)

    }
     
    
    
    render(){
        //  we can loop throug the props 

        const {messages} = this.props;
        var messageList = [];
       
        for(let message of this.props.messages){
            //  
            
            if(!message.message.dismissed){
                messageList.push(<NotificationCenterMessage
                //key={}
                    messageBody={message.message.title}
                    dismissTimer={3000}
                    close={()=>{
                        //  so the message can close it self
                        //  and have a clise button that will 
                        //  dismiss it 
                        message.dissmissMessage()
                    }}  
                    //  the childern ar the calls to actions
    
                >
    
    
                </NotificationCenterMessage>)
            }
            
        }
        return (
            <div className="notification-center-wrapper">
               <div className="notification-center-message-list">
                    {messageList}
                </div> 
            </div>
        )
    }
}

const NotificationCenterMessage = (props)=>{

    //  with all the props we can do some cool ass things 
    if(props.dismissTimer){
        setTimeout(()=>{
            //  close the message
            props.close();
        },props.dismissTimer);
    }
   
    
    
    return (<Alert 
        size="sm"
                color="secondary" 
                isOpen={true}>
                <img 
                    src = {require("./information-dark.svg")}
                    style={{
                        height: "0.75rem",
                        width : "0.75rem",
                        marginRight : "0.5rem"
                    }}
                />{props.messageBody}
            </Alert>)
}