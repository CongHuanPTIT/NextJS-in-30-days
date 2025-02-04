import { useState, useEffect } from "react";
import "./App.css";

/*
  Day 8-9-10: React Fundamentals
  - How React works
  - Ternary Operations
  - JSX = HTML in JS
  - Components and Props
  => F1Car and App
*/ 
const F1Car = (props) => {
  return (
    <>
      <h1>Brand: {props.brand}</h1>
      <h2>Car name: {props.carName}</h2>
    </>
  );
}

const App = () => {
  let name = 'Huan';
  let me = true;
  return (
    <>
      <div className="App">
        <h1>Hello, React!</h1>
        <h2>This is {me ? name : 'someone'} coding!</h2>
      </div>
      <div>
        <F1Car brand={'Ferrari'} carName={'SF90'}/>
        <F1Car brand={'Mercedes'} carName={'W20'}/>
        <F1Car brand={'McLaren'} carName={'MCL34'}/>
      </div>
    </>
  );
}

/*
  Day 11-12: States management
  - Use useState() => "Hook" into React states
  - [stateName, setState] = useState(defaultValue)
  - Unlike JS, onClick is actually useful here  
*/

const App2 = () => {
  const [counter, setCounter] = useState(() => {
    let cnt = localStorage.getItem('count');
    return JSON.parse(cnt) || 0;
  });
  
/*
  Day 13-14: Effects management
  - Using useEffect() to handle lifecycle-related events
  - Calling non-React things as long as the component's state changes 
*/
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(counter));
  }, [counter]);
  
  const handleCounterChange = (delta) => {
    setCounter((prevCounter) => prevCounter + delta);
  }

  return (
    <>
      <div className="App">
        <button onClick={() => handleCounterChange(1)}>Up</button>
        <h1>{counter}</h1>
        <button onClick={() => handleCounterChange(-1)}>Down</button>
      </div>
    </>
  );
}

export default App2;
