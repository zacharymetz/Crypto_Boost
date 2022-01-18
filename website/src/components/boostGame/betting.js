import React, { Component } from 'react';
import { withParse } from '../parse';
import './betting.css'
import { Button , InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';

export  class BettingPannel extends Component{
    constructor(props){
        super(props);
        this.state = {
            betType : "manual",
        }
    }
    selectBetType(type){
        this.setState({
            betType : type
        })
    }
    render(){
        var _this = this;
        const { betType } = this.state;
        const {currentWager,cancelBet, nextRoundWager,waitingForNextRound,crashed, selectedCurrency, selectCurrency } = this.props;

        let bettingInput = <ManualBet 
                placeManualBet={this.props.placeManualBet}
                cashout={this.props.cashout} 
                wagers={this.props.wagers}
                currentPayout={this.props.currentPayout}
                currentWager={currentWager}
                nextRoundWager={nextRoundWager}
                waitingForNextRound={waitingForNextRound}
                crashed={crashed}
                cancelBet={cancelBet}
                selectedCurrency={selectedCurrency}
                logMessage={this.props.logMessage}
        />
        if(betType == "auto"){
            bettingInput = < AutoBet />
        }


        return (
            <div className="betting-pannel-wrapper">
                <div className="bet-type-selector">
                    <Button 
                    onClick={()=>{
                        _this.selectBetType("manual")
                    }}
                    color="primary"  size="sm" style={{marginRight:"0.25rem"}}>Manuel</Button>{' '}
                    <Button 
                     onClick={()=>{
                        _this.selectBetType("auto")
                    }}
                    color="primary" size="sm">Auto-bet</Button>{' '}
                </div>
                <div style={{paddingTop:"0rem", flexGrow : "1", height:"100%", overflow:"hidden"}}>
                    {bettingInput}
                </div>
            </div>
        )
    }
}







class ManualBet extends Component{
    constructor(props){
        super(props);
        this.state = {
            betAmmount : 0 ,
            autoCashout : 0,
            betPlaced : false
        }
    }
    onChange = event => {
        
        this.setState({ [event.target.name]: event.target.value });
    }
    submitBet(){
        this.props.logMessage(
             { title : "Wager Submitted" }
        )
        const { betAmmount, autoCashout } = this.state;
        console.log(this.state)
        console.log("submitting wager")
        this.props.placeManualBet(betAmmount,autoCashout);

        this.setState( {
            betPlaced : true
        });
    }   
    cashout(){
        this.props.logMessage(
            { title : "Wager Cashed Out" }
       )
        this.props.cashout();
    }
    cancelBet(){
        this.props.logMessage(
            { title : "Bet Canceled" }
       )
        this.props.cancelBet();
    }
    render(){
        //console.log(this.state)
        const { betAmmount , autoCashout, betPlaced,  } = this.state;
        const { currentPayout,currentWager, nextRoundWager,waitingForNextRound,crashed, selectCurrency, selectedCurrency } = this.props
        //console.log("wager states :",currentWager, nextRoundWager)
        var _this = this;
        //  if we have cashouted then we just clear us 
        
        //  make the button here 
        let betButton = (<Button color="primary" size="sm" block
                            onClick={()=>{
                                _this.submitBet()
                            }}
                        >Place Bet</Button>)
        

        //  we also need to make a few style things here 
        let betOverlayStyles = {
            position : " absolute",
            backgroundColor : "rgb(0,0,0,0.5)",
            top :0,
            zIndex : 95
        }
        
        //  if we are before the intersage and you 
        //  have no but then you can cancel it 
        if(nextRoundWager.value && (!currentWager.value || (currentWager.payout && currentWager.value))){
            betButton = (<Button color="primary" size="sm" block
                            onClick={()=>{
                                _this.cancelBet()
                            }}
                        >Cancel Bet</Button>);
             betOverlayStyles.height = "100%";
            betOverlayStyles.width = "100%";
        }

        if(currentWager.value && !currentWager.payout){
            betButton = ( <Button color="primary" size="sm" block
                            onClick={()=>{
                                _this.cashout()
                            }}
                        >Cashout</Button>);
            betOverlayStyles.height = "100%";
            betOverlayStyles.width = "100%";
        }
        if(currentWager.value && waitingForNextRound ){
            betButton = ( <Button color="primary" size="sm" block disabled
                            
                        >Waiting For Round...</Button>);
            betOverlayStyles.height = "100%";
            betOverlayStyles.width = "100%";
        }
        
        //  the place bet window 
        let betWindow = (
            <div style={{padding:"0.5rem"}}>
                <div  style={{position:"relative"}}>
                    <div>Bet Ammount</div>
                    <InputGroup size="sm" >
                        
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input
                        name="betAmmount"
                        value={betAmmount}
                        onChange={this.onChange}
                        />
                        
                        <InputGroupAddon addonType="append"><Button>1/2</Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button>x2</Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button>Max</Button></InputGroupAddon>
                    </InputGroup>
                    <div>Auto Cashout</div>
                    <InputGroup size="sm" style={{paddingBottom:"1rem"}}>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input
                        name="autoCashout"
                        value={autoCashout}
                        onChange={this.onChange}
                        />
                        
                        
                        <InputGroupAddon addonType="append"><Button>X</Button></InputGroupAddon>
                    </InputGroup>


                    <div style={betOverlayStyles}>

                    </div>
                </div>
                <div>
                    {betButton}
                </div>
                
            </div>
        )

       

        //  here the round is going and we can cashout our bet             
        //  if the the player has placed a bet give them a button to pull out 
        //  with 
        // if(betPlaced){
        //     betWindow = (
        //         <div style={{padding:"0.5rem"}}>
        //             <div>CashOut Ammount</div>
        //             <div>
        //                 $ {currentPayout * betAmmount }
        //             </div>
        //             <Button color="primary" size="sm" block
        //                 onClick={()=>{
        //                     _this.cashout()
        //                 }}
        //             >Cashout</Button>
        //         </div>
        //     )
        // }


        return (
            <div class="manual-bet-pannel">
                {betWindow}
                <div style={{flexGrow:1,height:"100%", overflow: "hidden"}}>
                    < PlacedBets  wagers={this.props.wagers} />
                </div>

                
            </div>
        )
    }
}

class PlacedBets extends Component{
    render(){
        const { wagers } = this.props;

        let testPlayers = [];
        const sorted_wagers = wagers.sort((a,b) => a.bot - b.bot)
        for(let wager of sorted_wagers){
            
            //  lets do some calulations for each item 
            let value = wager.value;
            let payout = "";
            
            if(wager.payout){
                value = (parseFloat(wager.payout) * parseFloat(wager.value)).toFixed(2)
                payout = "x" + wager.payout 
            };

            testPlayers.push(
                <div className="session-wager-list-item">
                        <div className="session-wager-player-status">
                            
                        </div>
                        <div className="session-wager-player-name">
                        {wager.name} 
                        </div>
                        <div className="session-wager-player-delta">
                            {payout}
                        </div>
                        <div className="session-wager-player-ammount">
                            ${value} 
                        </div>
                        <div className="session-wager-player-currency">
                            
                        </div>
                    </div>
            )
        }


        return (
            <div className="betting-session-wagers" >
                <div className="session-wagers-header" >
                    <div className="session-wagers-players" >
                        {sorted_wagers.length} players
                    </div>
                    <div className="session-wagers-total">
                        ${sorted_wagers.length > 0 ? sorted_wagers.map(a=>parseFloat(a.value)).reduce((a,b)=>a + b) : 0}
                    </div>
                </div>
                
                <div className="session-wager-list">
                {testPlayers}
                    </div>
                
                
            </div>
        )
    }
}



class AutoBet extends Component{
    constructor(props){
        super(props);
        this.state = {
            betAmmount : 0 ,
            betChashout : 0,
            totalBets : 0,
            onWin : 0,
            onWinIncrease : true,
            onLoss : 0,
            onLossIncrease : true,
            stopAtProfit : 0,
            stopAtLoss : 0
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    placeBet(){

    }
    cancelBet(){

    }
    render(){
        const { betAmmount,betChashout,totalBets,onWin,onWinIncrease,onLoss,onLossIncrease,stopAtProfit,stopAtLoss } = this.state;
        var _this = this;
        return (
            <div className="auto-bet-pannel">
                <div style={{padding:"0.5rem"}}>
                    <div>Bet Ammount</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input
                        name="betAmmount"
                        value={betAmmount}
                        onChange={this.onChange}
                        />
                        
                        <InputGroupAddon addonType="append"><Button>1/2</Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button>x2</Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button>Max</Button></InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="bet-row">
                    <div className="bet-col" style={{marginRight:"0.5rem"}}>
                    <div>Bet Cashout</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input
                        name="betChashout"
                        value={betChashout}
                        onChange={this.onChange}
                        />
                        
                        
                    </InputGroup>
                    </div>
                    <div className="bet-col" >
                    <div>Total Bets</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                        <Input 
                        name="totalBets"
                        value={totalBets}
                        onChange={this.onChange}
                        />
                        
                        
                    </InputGroup>
                    </div>
                </div>

                <div style={{padding:"0.5rem"}}>
                    <div>On Win</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                        <Input
                        name="onWin"
                        value={onWin}
                        onChange={this.onChange}
                        />
                        
                       
                        <InputGroupAddon addonType="append" 
                        onClick={()=>{
                            _this.setState({
                                onWinIncrease : true
                            })
                        }}
                        
                        ><Button
                        outline={!onWinIncrease}
                        >Increase</Button></InputGroupAddon>
                        <InputGroupAddon
                        onClick={()=>{
                            _this.setState({
                                onWinIncrease : false
                            })
                        }}
                        addonType="append">
                        <Button 
                        outline={onWinIncrease}>Reset</Button></InputGroupAddon>
                    </InputGroup>
                </div>

                <div style={{padding:"0.5rem"}}>
                    <div>On Loss</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                        <Input 
                        
                        name="onLoss"
                        value={onLoss}
                        onChange={this.onChange}/>
                        
                        
                        <InputGroupAddon 
                        onClick={()=>{
                            _this.setState({
                                onLossIncrease : true
                            })
                        }}
                        addonType="append" ><Button outline={!onLossIncrease}>Increase </Button></InputGroupAddon>
                        <InputGroupAddon 
                        onClick={()=>{
                            _this.setState({
                                onLossIncrease : false
                            })
                        }}
                        addonType="append"><Button outline={onLossIncrease}>Reset</Button></InputGroupAddon>
                    </InputGroup>
                </div>

                <div className="bet-row">
                    <div className="bet-col" style={{marginRight:"0.5rem"}}>
                    <div>Stop At Profit</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input 
                         name="stopAtProfit"
                         value={stopAtProfit}
                         onChange={this.onChange}
                        />
                        
                        
                    </InputGroup>
                    </div>
                    <div className="bet-col" >
                    <div>Stop At Loss</div>
                    <InputGroup size="sm" style={{paddingBottom:"0.5rem"}}>
                        
                        <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                        <Input 
                         name="stopAtLoss"
                         value={stopAtLoss}
                         onChange={this.onChange}
                        />
                        
                        
                    </InputGroup>
                    </div>
                </div>
                <div style={{padding:"0.5rem"}}>
                <Button color="primary" size="sm" block>Place Bet</Button>
                </div>
            </div>
        )
    }
}