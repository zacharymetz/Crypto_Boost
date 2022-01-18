import React, { Component } from 'react';
import { withParse } from '../parse';
import './index.css'
import { BoostLine , BoostRocket , BoostPayoutNumber,DefaultRocketSprite, BoostXaxis , BoostYaxis, RoundPreStart } from './baseGame';
import { BettingPannel } from './betting'
import { Header, HistoryBar, Footer, WalletDropDown, NotificationCenter, coins} from './bars'
import {internet} from 'faker'


class BoostGameBase extends Component{

    constructor(props){
        super(props);
        this.state = {
            xMax : 6, // time in seconds of the x axies
            xMin : 2,
            yMax :2.5 , //    the percentage of the y axis in integer precentage 
            currentPayout : 1,   //  current position 
            currentTick : 0,
            testPoints  : [
                [0,0],  //  at zero seconds the payout is 1
                [0.1,0.01]
            ],
            wagers : [], // a list of wagers for the current session 
            lastPayout : 1.43,
            coins : coins,
            payoutHistory : [],
            roundStart : (new Date()).getTime(),
            timeReaming : 0,
            crashed : false,
            nextRoundWager : {},
            currentWager : {},
            autoBetParameter : {    //  for setting up the auto betting
                enabled : false,    //  an in bot browser 
                baseValue : 0,
                cashoutValue : 0,
                totalBets : 0,
                onWin : 0,
                onWinIncrease : true,
                onLoss : 0,
                onLossIncrease : true,
                stopAtProfit : 0,
                stopAtLost : 0
            },
            autoBetCounters : {
                totalBets : 0,  //  how many auto bets 
                wagerSum : 0,   //  total auto bet win sum 
            },
            waitingForNextRound : false,
            selectedCurrency : {
                "name" : "BETA",
                "image" : "betacoin.png",
                "ammount" : 3245.32
            },
            notificationCenterMessage : [],
        };
        this.inializeConnection();
        
    }

    async inializeConnection(){
        //  connect socket to the server 
        var _this = this;
        _this.startGameLoop();
        return
        //  connect to the wallet table and wait for 
        //  updates on our table 
        let user = this.props.parse.parse.User.current();
        console.log("thing started")
        //  do a live query for their wallet object 
        const UserWallet = this.props.parse.parse.Object.extend("UserWallet");
        const walletQuery = new this.props.parse.parse.Query(UserWallet);
        //walletQuery.equalTo("id", user.attributes.userWallet.id);
        let wallet = await walletQuery.first()
        console.log(wallet)
        let walletSubscription = await walletQuery.subscribe();
        walletSubscription.on('open', () => {
            console.log('subscription opened');
            _this.startGameLoop();
        });
        walletSubscription.on('update', (object) => {
            console.log('object updated');
        });
        walletSubscription.on('close', () => {
            console.log('subscription closed');
        });
    }

    // this will add a notification center message  
    addNotificationCenterMessage(messageObject){
        //  add it to the list 
        var { notificationCenterMessage } = this.state;
        notificationCenterMessage.unshift({
            dissmissMessage : ()=>{
                //  when this function is called 
                //  the message will be removed from the
                //  notification center
                console.log(messageObject)
                messageObject.dismissed = true;

                this.setState({})
            },
            message : messageObject
        })

        this.setState({
            notificationCenterMessage : notificationCenterMessage
        })

    }



    //  master loop for boost game
    startGameLoop(){
        var currentTick = this.state.currentTick + 16;
        var _this = this;
        var currentPayout =  (Math.round((this.getPayoutAtTick(currentTick) + 1)*100) / 100);
        //console.log(currentTick)
        //  if we hit this we restart just for testing 
        if(this.state.testPoints[this.state.testPoints.length-1][1] < this.state.lastPayout){
            var testPoints = this.state.testPoints;
            let lastTestPoint = this.state.testPoints[this.state.testPoints.length-1];
            //console.log(this.getPayoutAtTick(currentTick),lastTestPoint[1] )
            //  if there is a % change from last time so we dont do alot of updates 
            // if(this.getPayoutAtTick(currentTick) > lastTestPoint[1]){
            //     testPoints.push(
            //         [
            //             currentTick ,
            //             this.getPayoutAtTick(currentTick) 
            //         ]
            //     );
            // }else{
            //     this.state.testPoints[this.state.testPoints.length-1][0] = currentTick
            // }
            testPoints.push(
                [
                    currentTick ,
                    this.getPayoutAtTick(currentTick) 
                ]);

            
            
            

            //  do a max y calculation
            var yMax = this.state.yMax;
            if(currentPayout > 2.2){
                yMax = currentPayout + 0.3
            }

            // so some checks to see if some bots need to pull out 
            const wagers = [...this.state.wagers]
            for(const wager of wagers){
                if(wager.bot && wager.pull_out < currentPayout * 100 && !wager.cashout){
                    // get the bot out of there lol 
                    this.cashoutBot(wager);
                     
                }

            }

            // check my wager for auto cashout and cash it out 
            


            this.setState({
                testPoints : testPoints,
                xMax : this.state.testPoints[this.state.testPoints.length-1][0] / 1000,
                currentTick : currentTick,
                currentPayout : currentPayout,
                yMax : yMax,
                wagers
                
            })
            setTimeout(()=>{
                
                _this.startGameLoop()
            },16)
        }else{
            console.log("done")
            //  we reset and then start the loop 
            let payoutHistory = this.state.payoutHistory;
            payoutHistory.unshift(this.state.currentPayout);
            _this.setState({
                crashed : true,
                payoutHistory:payoutHistory,
                
            })
            
            this.endBoostRound()
        }
    }
    endBoostRound(){
        
        var _this = this;
        setTimeout(()=>{
            this.setState({
                roundStart : (new Date()).getTime() + 7500, //  to seconds from now
                wagers : [] ,
                currentWager : {},
                waitingForNextRound : true,
            })
            _this.roundPreperationLoop();
        },3000)
        
    }

    roundPreperationLoop(){
        var _this = this;
        //  should run until the next round start then 
        //  hand it over to the game loop 
        if(this.state.roundStart < (new Date()).getTime()){
           //   the round starts  
            this.setState({
                xMax : 6, // time in seconds of the x axies
                yMax :2.5 , //    the percentage of the y axis in integer precentage 
                currentPayout : 1,   //  current position 
                testPoints  : [
                    [0,0],  //  at zero seconds the payout is 1
                    [0.1,0.01]
                ],
                lastPayout : (Math.random() * 10),
                timeReaming : 0,
                currentTick:0,
                crashed : false,
                waitingForNextRound : false,
                
            });
            setTimeout(()=>{
                _this.startGameLoop();
            },16)
        }else{
            // we should place random "bot bets"
            if(this.state.timeReaming % 10 == 0){
                this.submitBotWager(100,200)

            }
            




            //  if there is a wager then we can submit it 
            if(this.state.nextRoundWager.value){
                //  lock it in as my wager for 
                //  the round 
                this.submitWager(this.state.nextRoundWager.value,this.state.nextRoundWager.autoCashout);
                this.setState({
                    nextRoundWager : {}
                })
            } else if (this.state.autoBetParameter.enabled){
                //  if the auto bet is enabled we should submit the 
                //  wager and then incriment the paraments 
            }

            _this.setState({
                timeReaming : this.state.roundStart - (new Date()).getTime(),
                
            })
            setTimeout(()=>{
                _this.roundPreperationLoop();
            },0)
        }
        
    }




    //  function to get the formula at a point 
    getPayoutAtTick(t){

        //  this is a peice wise function that will return a 2 decimal 
        //  value for the payout at that time 
        if(t < 10472){  //  all the value is less than 10 seconds 
            //  for this one its just a linear function 
            let y = (t/1000) * 0.2 //    its just a constat
            
            
            return y;
        }else {
            //  here we have a devently shallow parabolic that will go up 
            //  and interesects with the function above
            let y = Math.pow( (t/1000) + 4,2 ) / 100
            
            
            return y
        }
    }





    placeManualBet(betAmmount,autoCashout){
        console.log(betAmmount,autoCashout)
        //  there are 2 time to palce bet, 
        if(this.state.roundStart > (new Date()).getTime()){
            //  1 is when we are in the interound stage and when placed cannot cancle 
            this.submitWager(betAmmount,autoCashout);
        }else{
            //  2 when we are in the round and we can cancel our bet until the intersage
            this.setState({
                nextRoundWager : {
                    name : "test account",
                    value : betAmmount,
                    autoCashout : autoCashout,
                    currenty : this.state.selectedCurrency
                }
            })
        }
        

        
        
    }

    cashout(){
        //  cashout this is just for me but i will need to change it 
        //  later with the server 
        
        let myWager = this.state.currentWager
        myWager.cashout = this.state.currentTick;
        myWager.payout = this.state.currentPayout;
        
        this.setState({
            currentWager : myWager
        })
        this.addNotificationCenterMessage({message:myWager.name + " cashed out at $" + (parseFloat(myWager.value) * this.state.currentPayout) + "!",image : myWager.currency.image})
    }

    cashoutBot(bot_wager){
        console.log("payed out bot",bot_wager)
        bot_wager.cashout = this.state.currentTick.toString();
        bot_wager.payout = this.state.currentPayout.toString();
        this.addNotificationCenterMessage({message:bot_wager.name + " cashed out at $" + (parseFloat(bot_wager.value) * this.state.currentPayout) + "!",image : bot_wager.currency.image})
    }
    

    submitWager(betAmmount,autoCashout){
        // so we will submit it (future to the server)
        let wagers = this.state.wagers;
        let wager = {
            name : internet.userName(),
            value : betAmmount,
            autoCashout : autoCashout,
            currency : this.state.selectedCurrency
        }
        wagers.push(wager)
        console.log(wagers)

        this.setState({
            wagers : wagers,
            currentWager : wager
        })

    }
    submitBotWager(betAmmount,autoCashout){
        // so we will submit it (future to the server)
        
        let wagers = this.state.wagers;
        let wager = {
            name : internet.userName(),
            value : (Math.floor(Math.abs(Math.random() - Math.random()) * (1 + 300.25 - 1.25) + 1.25)).toString(),
            autoCashout : autoCashout,
            currency : coins[Math.floor(Math.random() * coins.length)],
            pull_out : (Math.floor(Math.abs(Math.random() - Math.random()) * (1 + 3000 - 100.01) + 100.01)),
            bot : true
        }
        wagers.push(wager)
        console.log(wagers)

        this.setState({
            wagers : wagers
        })

    }


    cancelWager(){
        console.log("cancleing wager")
        this.setState({
            
            nextRoundWager : {}
        })
    }





    render(){
        const { wagers , 
                currentWager, 
                nextRoundWager,
                xMin , 
                yMax,
                timeReaming, 
                crashed , 
                testPoints ,
                currentPayout, 
                payoutHistory,
                currentTick,
                waitingForNextRound,
                selectedCurrency
                } = this.state;
        var _this = this;
        //  get the last point 
        let boostGameWindow = (
                        <div class="boost-game-wrapper">
                            <div class="boost-game-top-wrapper">   
                                <div class="boost-graph-wrapper">
                                    
                                    <BoostLine 
                                        testPoints={testPoints}
                                        xMax={currentTick / 1000}
                                        xMin={xMin}
                                        yMax={yMax}
                                        wagers={wagers}
                                    />
                                    <BoostRocket 
                                        testPoints={testPoints}
                                        xMax={currentTick / 1000}
                                        crashed={crashed}
                                        yMax={yMax}
                                        xMin={xMin}
                                    />
                                    <BoostPayoutNumber 
                                        crashed={crashed}
                                        currentPayout={currentPayout} 
                                        wager={currentWager}
                                    />
                                    
                                </div>
                            
                                <BoostXaxis xMax={currentTick / 1000} xMin={xMin} />
                            </div>
                            <div id="y-axis" class="boost-game-bottom-wrapper">
                            <div class="boost-y-axis-wrapper">
                                    <BoostYaxis 
                                        yMax={yMax}
                                        step={0.1}
                                    />
                                </div>
                                
                            </div>
                            
                        </div>
        );
        //  if the next round hasnt started yet 
        if(this.state.roundStart > (new Date()).getTime()){
            boostGameWindow =  (
                < RoundPreStart  
                timeRemaining={(timeReaming/1000).toFixed(2)} 
                />
            )
        }
        //console.log(wagers)
        return (

            <>
            <div className="boost-wrapper shadow-lg" >
                <div className="boost-header-wrapper" >
                    < Header >
                        <WalletDropDown
                        coins={this.state.coins}
                        selectCurrency={(currency)=>{
                            this.setState({
                                selectedCurrency : currency
                            })
                        }}
                        
                        selectedCurrency={selectedCurrency} />
                    </ Header>
                </div>
                <div className="boost-main-wrapper" >
                    <div className="boost-session-wrapper">
                        <div style={{marginRight:"   0rem"}}>
                            <BettingPannel 
                                crashed={crashed}
                                wagers={wagers} 
                                nextRoundWager={nextRoundWager}
                                currentWager={currentWager}
                                currentPayout={currentPayout}
                                //  for the notification center 
                                logMessage={(message)=>{
                                   // _this.addNotificationCenterMessage(message);
                                    console.log(message.title)
                                }}


                                //  will let us kknow if we are in the intersage
                                waitingForNextRound={waitingForNextRound}
                                placeManualBet={(betAmmount,cashout)=>{
                                    //  
                                    _this.placeManualBet(betAmmount,cashout)
                                }}
                                cashout={()=>{
                                    _this.cashout()
                                }}
                                cancelBet={()=>{
                                    _this.cancelWager()
                                }}
                            />
                        </div>
                        {boostGameWindow}
                        
                    </div>
                </div>
                <div className="boost-footer-wrapper" >
                    <Footer>
                        < HistoryBar payoutHistory={payoutHistory} />
                    </Footer>
                    
                </div>
           
            </div>
            <div
                style={{padding : "1rem",maxHeight : "500px", overflowY : "scroll"}}
            >
                  {this.state.notificationCenterMessage.map(x=><div style={{padding :"0.5rem", display : "flex", alignItems : "center"}} ><img 
                    style={{height : "18px", width : "18px",  marginRight : "1rem"}}
                    src={require("./icons/"+x.message.image)}
                  />{x.message.message}</div>)}
            </div>
          
            </>




            
        



        
        )
    }
}



export default withParse(BoostGameBase);
