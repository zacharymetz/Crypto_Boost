import React, { Component } from 'react';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../session';
import {UserDropDown} from '../UserDropDown'
import classnames from 'classnames';
import { Modal, ModalHeader,Button, Col, Alert, FormGroup, Label, Input, FormText} from 'reactstrap'
import { withParse } from '../parse';




class SignupFormBase extends Component{
    constructor(props){
        console.log(props.parse.parse.User.current())
        super(props);
            this.state = {
                username : "",
                email : "",
                password : "",
                tos : false,
                confirmPassword : "",
                error : ""
            
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    async onSubmit(event){
        console.log(this.state)
        const { username, email, password, confirmPassword, tos } = this.state;
        event.preventDefault();
        
        //  first see if the password match
        if(password != confirmPassword){
            this.setState({
                error : "Passwords do not match"
            });
            return;
        }
        
        
        
        try{
            await this.props.parse.createNewUser(username,email,password);
            this.props.done();
        }catch(error){
            this.setState({
                error : error.toString()
            })
        }
    }
    render(){
        var _this = this;
        const { username, email, password, confirmPassword, tos,error  } = this.state;
        let errorElement ;
        if(error){
            errorElement = (
            <Alert color="warning">
                {error}
            </Alert>
            )
        }

        const isInvalid = username == '' | email == '' | password == '' | confirmPassword == '' | tos
        
        return(   
        <div  
        style={{padding:"1rem"}}>
            { errorElement }
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>Username</Label>
                <Col sm={10}>
                    <Input 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={this.onChange}
                    id="exampleEmail" 
                    placeholder="example69" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                    <Input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={this.onChange}
                    id="exampleEmail" 
                    placeholder="example@example.com" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                    <Input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={this.onChange}
                    id="examplePassword" 
                    placeholder="Password" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword" sm={2}>Confirm</Label>
                <Col sm={10}>
                    <Input 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword}
                    onChange={this.onChange}
                    id="examplePassword" 
                    placeholder="Confirm Password" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword" sm={2}></Label>
                <Col sm={10}>
                    <FormGroup check>
                        <Label check>
                            <Input 
                            name="tos" 
                            value={tos}
                            onChange={this.onChange}
                            type="checkbox" /> I have read the <a href="#">Terms of Service</a> and agree to them.
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
            <FormGroup row >
                <Label for="examplePassword" sm={2}></Label>
                <Col sm={10}>
                    <Button disabled={isInvalid}  block color="danger" onClick={(event)=>{_this.onSubmit(event)}} >Signup</Button>{' '}
                </Col>
            </FormGroup>
        </div>
        )
    }
}

const SignupForm = withParse(SignupFormBase);





export class SignupModal extends Component{
    constructor(props){
        super(props);
            this.state = {
                showModal : false
            
        }
    }
    toggleModal(){
        this.setState({
            showModal : !this.state.showModal
        })
    }
    render(){
        var _this = this;
        const { showModal } = this.state;
        return(
        <div>
            <Button  size="sm" color="danger" 
            style={{marginRight:"0.5rem"}}
            onClick={()=>{
                    _this.toggleModal()
                }}>Signup</Button>{' '}
            <Modal centered isOpen={showModal} 
                toggle={()=>{
                    _this.toggleModal()
                }} className={""}>
                <ModalHeader toggle={()=>{
                    _this.toggleModal()
                }}>Signup</ModalHeader>
                
                    < SignupForm
                        done={()=>{
                            _this.toggleModal();
                        }}
                    />
                
                
            </Modal>
            
        </div>
            
            
        )
    }
}

