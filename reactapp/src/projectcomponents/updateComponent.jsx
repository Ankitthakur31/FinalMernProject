import React, { Component } from 'react';
import SelectComponent from './../classcomponents/selectComponent';
import SecureCallService from './../services/securecallservice';
import { Universities, Courses,Year } from './../models/constants';
var boxlayout = {
    margin: 20,
    padding: 20,
    border: '12px solid #DDD',
    
  };


class UpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentId:0,
            StudentName: '',
            University:'',
            Course:'',
            Year:'',
            Fees:0,
            universities: Universities,
            courses: Courses,
            year: Year,
            students:[],
            search:'',
        };
        // define an instancve of HTTP Service
        this.serv = new SecureCallService();
    }
    
    handleInputs=(evt)=> {
        this.setState({[evt.target.name]: evt.target.value});
    }

    handleClear=(evt)=>{
        this.setState({'StudentId':0});
        this.setState({'StudentName':''});
        this.setState({'University':''});
        this.setState({'Course':''});
        this.setState({'Year':''});
        this.setState({'Fees':0});
    };
     handleUpdate=(evt)=>{
         let student = {
             StudentId: this.state.StudentId,
             StudentName: this.state.StudentName,
             University: this.state.University,
             Course: this.state.Course,
             Year: this.state.Year,
             Fees: this.state.Fees
         };
        const token = sessionStorage.getItem('token'); 
         this.serv.updateStudent(student,token)
         .then((response)=>{
             console.log(response);
             
             this.props.history.push('/')
         }).catch((error)=>{
             console.log(`Error Occured ${error}`);
         });
     }
    componentDidMount(){
       this.studentRow();
    }

    studentRow(){
        let id = this.props.match.params.id ;
        this.setState({StudentId:id});
    }
    
    getSelectedUniversity(val) {
        this.setState({University: val})
    }
    getSelectedCourse(val) {
        this.setState({Course: val})
    }
    getSelectedYear(val) {
        this.setState({Year: val})
    }
    logout()
    {
        sessionStorage.clear();
        this.props.history.push('/login')
    }
    back()
    {
        this.props.history.push('/')
    }
   
    render() {
        if (sessionStorage.getItem('token') === null ) {
            this.props.history.push('/login');
        }
        return (
            <div className="container" style={{marginTop:20}}>
                <input type="button" value="Logout =>" 
                onClick={this.logout.bind(this)} className="btn btn-danger" 
                style={{float : "right",margin:5}} />
                 <input type="button" value="Back" 
                onClick={this.back.bind(this)} className="btn btn-primary" 
                style={{float : "right",margin:5}} />
              <h2>Update Student</h2>
              <div style={boxlayout}>
                  
               <div className="form-group">
                  <label>Student Id</label>
                  <input type="text" value={this.state.StudentId} name="StudentId" readOnly  className="form-control"/>
               </div>
               <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" value={this.state.StudentName} name="StudentName" 
                  onChange={this.handleInputs.bind(this)}
                  className="form-control"/>
               </div>
               <div className="form-group">
                  <label>University</label>
                  <SelectComponent name="University" data={this.state.University} selectedValue={this.getSelectedUniversity.bind(this)} value={this.state.University} dataSource={this.state.universities}></SelectComponent>
               </div>
               <div className="form-group">
                 <label>Courses</label>
                 <SelectComponent name="Course" data={this.state.Course} selectedValue={this.getSelectedCourse.bind(this)} dataSource={this.state.courses}></SelectComponent>
               </div>
               <div className="form-group">
                 <label>Year</label>
                 <SelectComponent name="Year" data={this.state.Year} selectedValue={this.getSelectedYear.bind(this)} dataSource={this.state.year}></SelectComponent>
               </div>
               <div className="form-group">
                  <label>Fees</label>
                  <input type="text" value={this.state.Fees} name="Fees" 
                  onChange={this.handleInputs.bind(this)} className="form-control"/>
               </div>
               <div className="form-group">
                   <input type="button"  value="New" onClick={this.handleClear.bind(this)} style={{margin:5}} className="btn btn-warning"/>
                   <input type="button" value="Update" onClick={this.handleUpdate.bind(this)} className="btn btn-success"/>    
               </div>
                <hr/>
                </div>
            </div>
        );
    }
}

export default UpdateComponent;