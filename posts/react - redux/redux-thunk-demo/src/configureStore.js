import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
    // Tạo store sử dụng thunk
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
};
