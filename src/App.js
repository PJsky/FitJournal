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
            <div className="side-panel-card calendar">
              <div className="calendar-bar">
                <p>Calendar</p>
              </div>
              <div className="calendar-body"></div>
            </div>
            <div className="side-panel-card calorie-graph">
              <div className="calorie-graph-bar">
                <p>Calorie Graph</p>
              </div>
              <div className="calorie-graph-body"></div>
            </div>
          </div>
          <main className="main-panel">
            <ul className="main-panel-button-bar">
              <li>+ Food</li>
              <li>+ Biometric</li>
              <li>+ Note</li>
            </ul>
            <div className="journal-page">
              <table className="journal-day">
                <tr>
                  <th> Description</th>
                  <th> Amount</th>
                  <th> Calories</th>
                </tr>
                <tr>
                  <td> Description</td>
                  <td> Amount</td>
                  <td> Calories</td>
                </tr>
                <tr>
                  <td> Description</td>
                  <td> Amount</td>
                  <td> Calories</td>
                </tr>

              </table>
            
              <h1>Counter: {counter}</h1>
              <button  onClick={() => dispatch(increment(2))}>+</button>
              <button  onClick={() => dispatch(decrement(2))}>-</button>
              {isLogged ? <h3>Logged</h3> : ''}
            </div>
           
          </main>
          <div className="side-panel right-side-panel">
            <div className="right-side-panel-bar">
                <p>Daily Summary</p>
              </div>
            <div className="calorie-ring"></div>
            <div className="calorie-bars"></div>
          </div>
        </section>
    </div>
  );
}

export default App;