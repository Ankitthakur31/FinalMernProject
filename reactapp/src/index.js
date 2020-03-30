import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import DashboardComponent from "./projectcomponents/dashboardComponent";
import LoginComponent from "./projectcomponents/loginConponent";
import CreateComponent from "./projectcomponents/createComponent";
import IndexComponent from "./projectcomponents/indexComponent";
    
//ReactDOM.render(< IndexComponent/>, document.getElementById('root'));

ReactDOM.render(
         <BrowserRouter>
             <IndexComponent></IndexComponent>
        </BrowserRouter>
         ,document.getElementById('root')
     );

 
serviceWorker.unregister();


