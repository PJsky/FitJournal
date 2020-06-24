import React from 'react';
import './styles/style.css';
import Nav from './components/Nav';
import Main_content from './components/Main_content';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  const modalState = useSelector(state => state.modalState)

  return (
    <div className={modalState!="hidden"? "App App-no-overflow":"App"}>   
      <Nav> </Nav>
      <Main_content/>
    </div>
  );
}

export default App;