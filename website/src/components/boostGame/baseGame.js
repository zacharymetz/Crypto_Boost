import React, { Component } from 'react';
import { withParse } from '../parse';
import './index.css'
import './xaxis.css';





export class BoostRocket extends Component{
    constructor(props){
        super(props);
        this.state = {
            lastAngle : 0
        }
    }
    render(){
        var { xMin, xMax } = this.props; 
        //  first we need to find out where to place the rocket 
        if(xMax < xMin){
            xMax = xMin
        }
        
        //  to get the top and angle we need the last line
        let top = 0;
        top = this.props.testPoints[this.props.testPoints.length-1][1];
        top = ((1-(top / this.props.yMax))*100) + "%";
        
        //  lets calculate the right value 
        let right = 0 // = "-32px";
        right = this.props.testPoints[this.props.testPoints.length-1][0] / 1000;
        right =   "calc( "+  ((((right / xMax))*200)-100) + "% - 32px )";
        //console.log(  right)


        //  now we have to figure out the angle 
        //  we have the hyp and now need to 
        
        //  so smooth out the animation 
        let offset = 0;
        if(this.props.testPoints.length > 22){
            offset = this.props.testPoints.length - 22 
        }
        let P1 = this.props.testPoints[this.props.testPoints.length - 2]
        
        let P2 = this.props.testPoints[this.props.testPoints.length-1]
        let hyp =  (Math.sqrt(Math.pow((P1[0]/ 1000) - (P2[0]/1000),2) + Math.pow(P1[1] - P2[1],2))) ;
        let adj =  (P2[1] - P1[1]);
        let angle =  (Math.acos(adj/hyp) * (180/Math.PI))  ;
        angle = ( angle) 
        //console.log(adj, hyp, angle, P1, P2)





        return (
        <div class="boost-rocket-wrapper">
            <div class="boost-rocket-sprite" 
            style={{
                left:right,
                top:top,
                transform: "rotate(70deg)",

                transformOrigin: "center top "
            }}>
                
                < DefaultRocketSprite />
            </div>
        </div>
        )
    }
}

export function DefaultRocketSprite(props){
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
       }}>
           <div className ="rocket-sprite" />
           <div className = "rocket-sprite-flames" >
               <div class='fire'>
                   <div class='flame'></div>
                   <div class='flame'></div>
                   <div class='flame'></div>
                   <div class='flame'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
                   <div class='spark'></div>
               </div>
           </div>
       </div>
    )
}


export class BoostYaxis extends Component{
    constructor(props){
        super(props);
        this.state = {
            height : 0,
            offset : 15, //  the offset in px
        };
    }
    componentDidMount() {
        const height = document.getElementById('y-axis').clientHeight;
        this.setState({ height });
      }
    render(){
        const { height, offset } = this.state;

        var  { yMax , step } = this.props;
        //console.log(this.props)
        yMax++
        let currentStep = 1 + step;
        let numberedTicks = [1];
        while(currentStep <= ((yMax + step )*2)){
            numberedTicks.push(currentStep);
            currentStep = currentStep + step;
        }
        
        numberedTicks = distributedCopy(numberedTicks,50);
        //  now lets build all the delimiter steps 
        let tickElements = []//<NumberedTick value={1} majorTick={true} height={18}  />];
        let majorTick = false; // flag that gets changed so we know if it should
                                //  be a major more minor one 
        for(let i=0;i<numberedTicks.length;i++){
            //  get the height percentage 
            let tickHeight = (((numberedTicks[i]-1)/(yMax-1)) * (height-offset)) + offset ;
            
            //  get an inrment constant 
            let incriment = ((1/(numberedTicks.length * 4)) * (height-offset)) ;

            // each loop we need to add 3 ticks 
            // for(let j=0;j<3;j++){
            //     let hight = tickHeight + (incriment * j) +12
            //     tickElements.push(<RegularTick height={hight} />); 
            // }
            
            // then we can create the numbered tick 
            tickElements.push(<NumberedTick 
                                value={numberedTicks[i]}
                                majorTick={majorTick}
                                height={tickHeight}
                              />);
             //then we change the flag 
            //console.log("height for : ",numberedTicks[i], tickHeight)
        }
        tickElements = tickElements.reverse()
        return (
        <div  className="y-axis-element" >
            <div class="boost-yaxis-wrapper">
                {tickElements}
            </div>
        </div>
        
        )
    }
}
function NumberedTick(props){
    let hight = props.height +7
    return (
        <div class="yaxis-tick-wrapper" style={{bottom:hight + "px"}}>
            <div class="yaxis-tick-large" >

            </div>
            {Math.round(props.value* 100)/100}
        </div>
    )
}
function RegularTick(props){
    let hight = props.height //- 2
    return (
        <div  id="y-axis" class="yaxis-tick-wrapper" style={{bottom:hight + "px"}}>
            <div class="yaxis-tick">

            </div>
        </div>
    )
}

export class BoostXaxis extends Component{
    constructor(props){
        super(props);
        this.state = {
            width : 0,
            offset : 0, //  the offset in px
        };
    }
    componentDidMount() {
        const width = document.getElementById('x-axis').clientWidth;
        this.setState({ width });
    }
    render(){
        var  { xMax  } = this.props;
        const { width, offset } = this.state;
        let currentStep = 2;
        let numberedTicks = [2];
        while(currentStep <= ((xMax + 2 ))){
            numberedTicks.push(currentStep);
            currentStep = currentStep + 2;
        }


        let tickElements = []
        for(let i=0;i<numberedTicks.length;i++){
            let tickWidth = (((numberedTicks[i]-1)/(xMax-1)) * (width-offset)) + offset ;
            tickElements.push(<XaxisTick 
                value={numberedTicks[i]}
                left={tickWidth}
              />);
            
        }
        
        return (
        <div id="x-axis" className="x-axis-element">
            <div className="boost-x-axis" >
                {tickElements}
            </div>
        </div>
        )
    }
}
function XaxisTick(props){
    return (
    <div  class="xaxis-tick-wrapper" style={{left:props.left + "px"}}>
        <div class="xaxis-tick">

        </div>
        <div>
        {props.value}s
        </div>
        
    </div>
    )
}

export class BoostPayoutNumber extends Component{
    
    render(){
        let style ={}
        if(this.props.crashed){
            style.color = "red";
        }
        let myPayoutElemnt;
        if(this.props.wager.value){
            myPayoutElemnt = (
                <div class="boost-payout-currency-value">
                    + ${(this.props.currentPayout * parseFloat(this.props.wager.value)).toFixed(2)}
                    </div>
            )
        } 
        if(this.props.wager.payout){
            myPayoutElemnt = (
                <div class="boost-payout-currency-value">
                    + ${(parseFloat(this.props.wager.payout) * parseFloat(this.props.wager.value)).toFixed(2)}
                </div>
            );
        }else{
            if(this.props.crashed && this.props.wager.value){
                myPayoutElemnt = (
                    <div class="boost-payout-currency-value" style={style}>
                        - ${(parseFloat(this.props.wager.value)).toFixed(2)}
                        </div>
                )
            }
        }
        return (
            <div className="boost-payout-number-wrapper">
                <div className="boots-payout-display" style={style}>
                    <div className="boost-payout-number">
                        {this.props.currentPayout.toFixed(2)}x
                    </div>
                    <div className="boost-payout-subtitle">
                        Current Payout
                    </div >
                    {myPayoutElemnt}
                </div>

                
            </div>
        )
    }
}

//  creates the svg line 
export class BoostLine extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        var { testPoints, xMax, xMin, wagers } = this.props;
        if(xMax < xMin){
            xMax = xMin
        }
        //  create all the lines based on where they should be 
        let lines = [];
        for(let i =1;i<testPoints.length;i++){
            //  starting point 
            let x1 =( (((testPoints[i-1][0]/ 1000) /xMax) *100) - 0.02  )+ "%";
            let y1 =( ((1-(testPoints[i-1][1] /this.props.yMax)) *100)  - 0.02  )+ "%";
            
            //  ending point 
            let x2 =( (((testPoints[i][0]/1000) /xMax) *100) + 0.02  ) + "%";
            let y2 =( ((1-(testPoints[i][1] /this.props.yMax)) *100) + 0.02  ) + "%";
            //console.log(x2,y2)
            lines.push(
                <line 
                stroke-linecap="round"
                    x1={x1 } 
                    y1={y1}
                    x2={x2} 
                    y2={y2} 
                    style={{stroke:"rgb(255,255,255,0.3)",strokeWidth:"5", borderRadius: "3px"}} 
                    key={"line-segment-"+i}
                />
            )
        }

        //  now lets make the elements for all the wagers 
        let wagerElements = [];
        for( let wager of wagers){
            if(wager.payout){

                //  caculate the middle point for the 
                //  placement of the wager element 

                let x =( (((wager.cashout/ 1000) /xMax) *100) - 0.02  )+ "%";
                let y =( ((((wager.payout-1) /(this.props.yMax))) *100)  )+ "%";
                 
                wagerElements.push(
                    <LineWagerItem 
                        bottom={y}
                        left={x}

                        multiplyer={wager.payout}
                        tick={wager.cashout}
                        value={wager.value}
                        wager={wager}
                    />
                ) 
            }
            
        }

        return (
            <div class="boost-line-wrapper">
                <div class="boost-line-inner-wrapper">
                    <div className="boost-line-svg-wrapper">
                        <svg class="boost-line-svg">
                            {lines}
                            
                        </svg>
                    </div>
                    <div className="boost-line-wager-wrapper">
                        <div className="boost-line-wager">
                            {wagerElements}
                        </div>
                    </div>
                
                </div>
                
                
            </div>
        )
    }
}




export function RoundPreStart(props){
    return (
    <div className="pre-round-wrapper">
    <div style={{
        display : "flex",

    }}>
        < DefaultRocketSprite />
        <div style={{ textAlign : "center" }}>
            <div className="pre-round-title">
                Perparing Round
            </div>
            <div className="pre-round-round-down">
                Starting In <span >{props.timeRemaining}s</span>
            </div>
        </div>
        
    </div>

        
    </div>
    )
}


class LineWagerItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            height : 0,
            width : 0,
            elmID : uuidv4() + "-wager-placement",
            hover:false
        };
    }
    componentDidMount() {
        const height = document.getElementById(this.state.elmID).clientHeight;

        const width = document.getElementById(this.state.elmID).clientWidth;
        this.setState({ height, width });
    }
    onMouseOver(){
        console.log("mouse over")
        this.setState({
            hover:true
        })
    }
    onMouseOut(){
        console.log("mouse out")
        this.setState({
            hover:false
        })
    }
    render(){
        var _this = this;
        const { elmID,height,width } = this.state; 
        const { bottom, left, wager  } = this.props;
        
        return (
            <div 
                onMouseEnter={()=>{
                    _this.onMouseOver();
                }}
                id={elmID}
                style={{
                    position : "absolute",
                    bottom: "calc( "+ bottom + " - " + (height/2) + "px )",
                    left: "calc( "+ left + " - " + (width/2) + "px )",
                    zIndex : 10000
                }}
            >
                < img  src={require("./icons/"+wager.currency.image)} style={{height : "1.5rem", width : "1.5rem"}}  />
                
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
  

function distributedCopy(items, n) {
    
    var elements = [items[0]];
    var totalItems = items.length - 2;
    var interval = Math.floor(totalItems/(n - 2));
    for (var i = 1; i < n - 1; i++) {
        elements.push(items[i * interval]);
    }
    elements.push(items[items.length - 1]);
    return elements;
}