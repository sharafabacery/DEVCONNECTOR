import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Register from './components/auth/Register'
//Redux
import {Provider} from 'react-redux' //integrate between react redux 
import store from './store'

import './App.css';

const App=()=> {
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
     <Navbar/>
     <Route exact path="/" component={Landing}/>
     <section className="container">
     <Alert/>
     <Switch>
     <Route exact path="/register" component={Register}/>
     <Route exact path="/login" component={Login}/>
     </Switch>
     
     </section> 


    </Fragment>
  
    </Router></Provider>
    );
}

export default App;
