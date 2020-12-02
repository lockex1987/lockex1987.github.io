import React from 'react';
import { useSelector } from 'react-redux';


function App() {
  const counter = useSelector(state => state.counter);
  //console.log(counter);
  const isLogged = useSelector(state => state.isLogged);

  return (
    <div>
      <p>Counter: {counter}</p>

      {isLogged ? <p>Logged</p> : ''}
    </div>
  );
}

export default App;
