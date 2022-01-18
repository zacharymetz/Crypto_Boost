import React, { Component } from 'react'


export default () =>{
    return(<div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", justifyContent : "center"}}>
        <CameraView 
        name="Cam01"
        ip="192.168.1.80"/>
        <CameraView name="Cam02"
        ip="192.168.1.82"/>
        
    </div>
    <div style={{display:"flex", justifyContent : "center"}}>
        <CameraView 
        name="Cam03"
        ip="192.168.1.81"
         />
        <CameraView name="Cam04"
        ip />
        
    </div>
        
    </div>)
}



//  make this a class so that i can click on it and make it go
//  full screen when i want too 
class CameraView  extends Component{
    constructor(props){
        super(props);
        this.state = {
            fullScreen : false
        }
    }
    async toggleFullScreen(){
        this.setState({
            fullScreen : !this.state.fullScreen
        })
    }
    render(){
       const { fullScreen } = this.state;
        var camBoxClasses ={height:"360px", background : "rgb(0,0,0,0.5)",
        width:"480px", position : "relative",transition: "all .1s ease-in-out"};
        var outsideClasses = {}
        if(fullScreen){
            camBoxClasses = {
                top : 0 ,height:"100vh", width:"100vw",zIndex : 1000, position : "absolute", padding:"1rem",transition: "all .4s ease-in-out",
                background : "rgb(0,0,0,0.5)", top : 0, left : 0
            };
            var outsideClasses = {
                position : "absolute", top : 0, left : 0
            }
        }
        var _this = this;

        return(
            <div
            style={{width:"480px",height:"360px", margin:"0.25rem" , overflow : "hidden"}}>
                <div style={outsideClasses}   >
                    <div style={camBoxClasses} onClick={()=>{_this.toggleFullScreen()}} >
                        <div style={{position:"relative", fontWeight : 700,color : "green", width:"100%"}}>
                        <div style={{position:"absolute", fontWeight : 700,color : "green", padding:"0.5rem", width:"100%"}}>
                            {this.props.name}
                            <div style={{float : "right",height : "1rem", margin : "0.5rem", width : "1rem", background : "red", borderRadius : "50%"}}></div>
                        </div>
                        </div>
                        
                        <img style={{zIndez : 100, webkitUserSelect: "none",margin: "auto", height : "100%", width:"100%" }}src={"http://"+this.props.ip+":8080/video"}>
                            
                        </img>
                        
                    
                    </div>
                </div>
            </div>
            
        )    
        
    }
} 