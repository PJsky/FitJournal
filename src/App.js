import React from 'react';
import './styles/style.css';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './actions';
import Nav from './components/Nav';


function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Nav> </Nav>
        <section className="main-content">
          <div className="side-panel left-side-panel">
            <div className="side-panel-card calendar"></div>
            <div className="side-panel-card calorie-graph"></div>
          </div>
          <main className="main-panel">
            <h1>Counter: {counter}</h1>
            <button  onClick={() => dispatch(increment(2))}>+</button>
            <button  onClick={() => dispatch(decrement(2))}>-</button>
            {isLogged ? <h3>Logged</h3> : ''}
          </main>
          <div className="side-panel right-side-panel">
            <div className="calorie-ring"></div>
            <div className="calorie-bars"></div>
          </div>
        </section>
    </div>
  );
}

export default App;