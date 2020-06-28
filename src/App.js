import React from 'react';
import './styles/style.css';
import Nav from './components/Nav';
import Main_content from './components/Main_content';
import Main_page from './components/Main_page';
import Sign_in_page from './components/Sign_in_page';
import Sign_up_page from './components/Sign_up_page';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  const modalState = useSelector(state => state.modalState)

  return (
    <Router>
      <div className={modalState!="hidden"? "App App-no-overflow":"App"}>   
        <Nav> </Nav>
        <Switch>
          <Route path="/content" exact component={Main_content}/>
          <Route path="/signin" exact component={Sign_in_page}/>
          <Route path="/" exact component={Main_page}/>
          <Route path="/signup" exact component={Sign_up_page}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;