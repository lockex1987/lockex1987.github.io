import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers';
import Result from './Result';
import Controls from './Controls';

//import './standalone-redux';


const store = createStore(allReducers);
//console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <Result />

        <Controls />
    </Provider>,
    document.getElementById('root')
);

