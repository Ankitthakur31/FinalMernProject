import React, { Component } from 'react';
import AmanCallApi from './../services/amancall';
import axios from 'axios'

class AmanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:''
        };
        // define an instancve of HTTP Service
        this.serv = new AmanCallApi();
    }

    handleSave(){
        let username={
            username:this.state.username
        }
        this.serv.store(username)
        .then((response)=>{
            console.log(response);
            
        })
    }
    
    render() {
        
        return (
            <div className="container" style={{marginTop:50}}>
                <input type="text" value ={this.value.username} className="form-control" onChange={(evt)=>this.setState({username: evt.target.value})}/>
                <input type="button" value="Save" onClick={this.handleSave}/>
            </div>
        )
         
    }
}

export default AmanComponent;