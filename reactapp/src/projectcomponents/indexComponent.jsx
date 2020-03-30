import React, { Component } from 'react';
import {Route, Link, Switch,Redirect} from 'react-router-dom';
import CreateComponent from './createComponent'
import LoginComponent from './loginConponent'
import DashboardComponent from './dashboardComponent'
import RegisterComponent from './registerComponent'
import UpdateComponent from './updateComponent'

const bodyStyle={
    backgroundColor : ''
}
class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            id:1000
        }
        
    }
    render() { 
        return (
            <div className="container-fluid" style={bodyStyle}>
                {/* <div>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#news">Login</a></li>
                        <li><a href="#contact">Register</a></li>
                    </ul>
                </div> */}
                {/* Define Route Table Here */}
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={DashboardComponent}></Route>
                        <Route exact path="/createStudents" component={CreateComponent}></Route>
                        <Route exact path="/login" component={LoginComponent}></Route>
                        <Route exact path="/register" component={RegisterComponent}></Route>
                        <Route exact path="/updateStudents/:id" component={UpdateComponent}></Route>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </div>
        );
    }
}
 
export default IndexComponent;