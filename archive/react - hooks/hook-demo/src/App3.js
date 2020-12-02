import React, { useState } from 'react';


const App3 = () => {
    const [fruits, setFruits] = useState({
        banana: 0,
        apple: 0
    });
    const [anything, setAnything] = useState(0);

    return (
        <div className='container'>
            <h2>App #2</h2>

            <p>You clicked banana {fruits.banana} times</p>
            <button onClick={() => setFruits({ ...fruits, banana: fruits.banana + 1 })}>
                Click banana
            </button>
            
            <p>You clicked apple {fruits.apple} times</p>
            <button onClick={() => setFruits({ ...fruits, apple: fruits.apple + 1 })}>
                Click apple
            </button>

            <p>You clicked anything {anything} times</p>
            <button onClick={() => setAnything(anything + 1)}>
                Click anything
            </button>
        </div>
    );
};

export default App3;
