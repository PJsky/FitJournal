import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './styles/style.css';
import Nav from './components/Nav';
import Main_content from './components/Main_content';
import Main_page from './components/Main_page';
import Sign_in_page from './components/Sign_in_page';
import Sign_up_page from './components/Sign_up_page';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { log_out, log_in } from './actions/auth';
import axios from 'axios'



function App() {
  const dispatch = useDispatch();

  window.addEventListener("storage",(function(e){
    console.log(localStorage.getItem("token"))
       if(!localStorage.getItem("token"))
        dispatch(log_out())
        else{
        axios.get(`http://localhost:3030/days`,
        {
            headers:{
                'auth-token' : localStorage.getItem("token")
            }
        })
        .then(({data}) => {
            dispatch(log_in());
        }, (error) => {
            dispatch(log_out());
        });
        }
    }).bind(this));

  const modalState = useSelector(state => state.modalState)
  const isLogged = useSelector(state => state.user);
  return (
    <Router>
      <div className={modalState!="hidden"? "App App-no-overflow":"App"}>   
        <Nav> </Nav>
        <Switch>
          {/* <Route path="/content" exact component={Main_content}/> */}
          <Route path="/content" exact render={(props) => (
            isLogged ? (<Main_content {...props}/>) : (<Redirect to='/signin'/>)
          )}/>
          <Route path="/" exact render={(props) => (
            !isLogged ? (<Main_page {...props}/>) : (<Redirect to='/content'/>)
          )}/>
          <Route path="/signin" exact render={(props) => (
            !isLogged ? (<Sign_in_page {...props}/>) : (<Redirect to='/content'/>)
          )}/>
          <Route path="/signup" exact render={(props) => (
            !isLogged ? (<Sign_up_page {...props}/>) : (<Redirect to='/content'/>)
          )}/>
          
          <Route path="/signin" exact component={Sign_in_page}/>
          <Route path="/" exact component={Main_page}/>
          <Route path="/signup" exact component={Sign_up_page}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;