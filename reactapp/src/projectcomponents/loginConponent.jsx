import React, { Component } from 'react';
import SecureCallService from './../services/securecallservice';
var boxlayout = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    
  };
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            userValid:true,
            reg: true,
            credentials : true
         }
         
        this.serv= new SecureCallService();
    }

    
    handleinputs=(evt)=>{
        this.setState({[evt.target.name] : evt.target.value});

        if(this.state.password && this.state.username){
            this.setState({reg : false})
        }
    };
   

    onLoginUser=()=>{
        const user = {
            UserName:this.state.username,
            Password: this.state.password
        };
        this.serv.login(user)
        .then((response)=> {
            if(response.data.statusCode === 200){

            // save the received token in session storage
            sessionStorage.setItem('token', response.data.data);
            this.props.history.push('/')
        }else{
            this.setState({credentials : false})
        }
        }).catch((error)=>{
            this.setState({user : false})
        });
    }
    navigateToRegister(){
        this.props.history.push('/register');
    }
    render() { 
        if (sessionStorage.getItem('token') !== null ) {
            this.props.history.push('/');
        }
        return (
            <div className="container" style={boxlayout}>
                <h1 style={{marginBottom : 20}}>Login </h1>
                <div className="form-group">
                    <input type="text" name="username" className="form-control" onChange={this.handleinputs.bind(this)} placeholder="Enter Username"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control"  onChange={this.handleinputs.bind(this)} placeholder="Enter Password"/>
                </div>
                <div hidden={this.state.credentials} className="alert alert-danger">Invalid Credentials</div>
             <div className="form-group">
                <input type="button" value="login" onClick={this.onLoginUser} disabled={this.state.reg} style={{marginBottom : 20}} className="btn btn-success"/>
                <p onClick={this.navigateToRegister.bind(this)} style={{color : 'blue' }}>Register as new user----></p>
               
           </div>
            </div>
        );
    }
}
 
export default LoginComponent;