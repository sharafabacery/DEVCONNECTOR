import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'
//Redux
import {Provider} from 'react-redux' //integrate between react redux 
import store from './store'
import {loadUser}from './actions/auth'
import setAuthToken from "./utils/setAuthToken";
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App=()=> {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[]) 


  return (
    <Provider store={store}>
    <Router>
    <Fragment>
     <Navbar/>
     <switch>
     <Route exact path="/" component={Landing}/>
     <Route component={Routes}/>
    
     </switch>
     


    </Fragment>
  
    </Router></Provider>
    );
}

export default App;
