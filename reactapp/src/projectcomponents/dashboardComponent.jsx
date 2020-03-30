import React, { Component } from 'react';
import {Route, Link, Switch,Redirect} from 'react-router-dom';
import SecureCallService from './../services/securecallservice';
import CreateComponent from './createComponent'
var boxlayout = {
    margin: 20,
    padding: 20,
    border: '12px solid #DDD',
    
  };
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student:[]
        };
        // define an instancve of HTTP Service
        this.serv = new SecureCallService();
        this.row = new CreateComponent();
    }

    sortByProperty(property){
        return function (x,y){
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };

    revByProperty(property){
        return function (x,y){
            return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
        };
    };

    sortin=(evt)=>{
        let stds = this.state.Student
        let id = evt.target.id;        
        stds.sort(this.sortByProperty(id));
        this.setState({'students' : stds});        
    }
    reversin=(evt)=>{
        let stds = this.state.Student
        let id = evt.target.id;        
        stds.sort(this.revByProperty(id));
        this.setState({'students' : stds});        
    }
    search(evt){
        let id = evt.target.value;
        //console.log(id);

        const token = sessionStorage.getItem('token'); 
         this.serv.getStudentsById(id,token)
         .then((response)=>{
            this.setState({Student : response.data.data})
         }).catch((error)=>{
             console.log(`Error Occured ${error}`);
    });

    }

    handleDelete(evt){
         let id = evt.target.name;
        // console.log(id);
         
         const token = sessionStorage.getItem('token'); 
         this.serv.deleteStudent(id,token)
         .then((response)=>{
            this.loadData();
            //sessionStorage.setItem('token', response.data.data);
         }).catch((error)=>{
             console.log(`Error Occured ${error}`);
    });
}
    
    // the method that has calls to all heavy operations or external async calls
    componentDidMount=()=>{
        this.loadData();
    }
    loadData=()=>{
        const token = sessionStorage.getItem('token'); 
        this.serv.getStudents(token)
        .then((response)=> {
            console.log(JSON.stringify(response.data.data));
            this.setState({Student : response.data.data})
           // sessionStorage.setItem('token', response.data.data);
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
        });
    }
    navigateToContact(){
        this.props.history.push(`createStudents/`);

    }
    handleEdit(row){
        
        this.props.history.push(`updateStudents/${row}`);
        
    }
    logout()
    {
        sessionStorage.clear();
        this.props.history.push('/login')
    }
    render() {
        if (sessionStorage.getItem('token') === null ) {
            this.props.history.push('/login');
        }
        let columns =[];
        for(let c in this.state.Student[0]){
            columns.push(c);
        }
        return (
            <div className="container" style={{marginTop:50}}>
                <input type="button" value="Logout =>" 
               onClick={this.logout.bind(this)} className="btn btn-danger" 
               style={{float : "right",marginTop:5}} />
                <h2>The Student Information page</h2>

               <div style={boxlayout}>
               <input type="text" name="searchBox" value={this.state.search} onBlur={this.search.bind(this)} placeholder="Search..."/>
                <input type="button" value="Create Students+" 
               onClick={this.navigateToContact.bind(this)} className="btn btn-warning"
               style={{float : "right",marginBottom:20,marginTop:10}} />
               
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        {
                            columns.map((c,i) => (
                                    <th key={i}>{c}<i id={c} style={{float : "right", marginLeft : 5}} onClick={this.sortin.bind(this)}> &#8593;</i><i id={c} style={{float : "right", marginLeft : 5}} onClick={this.reversin.bind(this)}> &#8595;</i></th>
                            ))
                        }
                            <th>Option</th>     

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.Student.map((d,j) => (
                            <tr key={j} >
                                {
                                    columns.map((c,i) => (
                                        <td key={i}>{d[c]}</td>
                                    )) 
                                }
                                    <td><button className="btn btn-danger" name={d.studentId} style={{margin:3}} onClick={()=>this.handleEdit(d.studentId)}>Edit</button>
                                        <button className="btn btn-danger" name={d.studentId} onClick={this.handleDelete.bind(this)}>Delete</button></td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default DashboardComponent;