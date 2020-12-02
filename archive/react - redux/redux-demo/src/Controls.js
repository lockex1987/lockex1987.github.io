import React from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement } from './actions';


function Controls() {
    const dispatch = useDispatch();
    const objectIncrement = {
        type: 'INCREMENT'
    };

    return (
        <div>
            <button onClick={() => dispatch(increment())}>
                +
            </button>

            <button onClick={() => dispatch(objectIncrement)}>
                +
            </button>

            <button onClick={() => dispatch(increment(5))}>
                +
            </button>
            
            <button onClick={() => dispatch(decrement())}>
                -
            </button>
        </div>
    );
}


export default Controls;
