import React, { Component } from 'react';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../session';
import {UserDropDown} from '../UserDropDown'
import classnames from 'classnames';
import { Modal, ModalHeader,Button, Col, Alert, FormGroup, Label, Input, FormText} from 'reactstrap'
import { withParse } from '../parse';





class LoginFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            remeberMe : ""
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    async onSubmit(){
        console.log("AsdSAD")
        const { email, password, remeberMe } = this.state;
        try{
            await this.props.parse.loginUser(email, password);
            console.log("loging in")
            this.props.done();
        }catch(error){
            this.setState({
                error : error.toString()
            });
        }
    }
    render(){
        const { email, password, remeberMe, error } = this.state;
        var _this = this;
        let errorElement ;
        if(error){
            errorElement = (
            <Alert color="warning">
                {error}
            </Alert>
            )
        }
        return(
            <div 
            style={{padding:"1rem"}}>
                {errorElement}
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={this.onChange}
                        id="exampleEmail" 
                        placeholder="with a placeholder" />
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
                        placeholder="password placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}></Label>
                    <Col sm={10}>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                name="remeberMe"
                                value={remeberMe}
                                onChange={this.onChange}
                                type="checkbox" /> Remeber Me
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="examplePassword" sm={2}></Label>
                    <Col sm={10}>
                    <Button  block color="danger" onClick={()=>{
                        _this.onSubmit()
                        }}>Login</Button>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}


const LoginForm = withParse(LoginFormBase);








export class LoginModal extends Component{
    constructor(props){
        super(props);
            this.state = {
                email : "",
                password : "",
                showModal : false
            
        }
    }
    toggleModal(){
        this.setState({
            showModal : !this.state.showModal
        })
    }
    loginUser(){
        this.toggleModal()
    }
    onChange(e){

    }
    render(){
        var _this = this;
        const { showModal } = this.state;
        return(
        <div>
            <Button  size="sm" color="danger" onClick={()=>{
                    _this.toggleModal()
                }}>Login</Button>{' '}
            <Modal centered isOpen={showModal} 
                toggle={()=>{
                    _this.toggleModal()
                }} className={""}>
                <ModalHeader toggle={()=>{
                    _this.toggleModal()
                }}>Login</ModalHeader>
                
                    < LoginForm  done={()=>{
                            _this.toggleModal();
                        }} />
                
                
            </Modal>
            
        </div>
            
            
        )
    }
}
