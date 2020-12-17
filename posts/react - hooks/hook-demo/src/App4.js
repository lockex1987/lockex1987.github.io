import React, { useState, useEffect } from 'react';


const App4 = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const text = `Window width is ${width}`;
        console.log(text);
        document.title = text;
    });

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='container'>
            <p>Window width is {width}</p>
        </div>
    );
};

export default App4;
