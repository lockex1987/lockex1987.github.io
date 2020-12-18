import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import TodoApp from './containers/TodoApp';
import rootReducer from './reducers/rootReducer';

import 'todomvc-app-css/index.css';

const initialState = {};
const store = createStore(rootReducer, initialState);

const root = (
  <Provider store={store}>
    <TodoApp />
  </Provider>
)

ReactDOM.render(
  root,
  document.getElementById('root')
);
