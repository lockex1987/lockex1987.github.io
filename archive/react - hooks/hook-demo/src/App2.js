import React, { useState } from 'react';


const App2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='container'>
      <h2>App #2</h2>

      <p>You clicked {count} times</p>

      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default App2;
