import { createStore } from 'redux';

// Khởi tạo state ban đầu
const initialState = {
    status: false
}

const myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        // Tạo và trả về state mới
        // không sửa state cũ
        let newState = { ...state };
        newState.status = !state.status;
        return newState;
    }

    return state;
}

// Khởi tạo store
const store = createStore(myReducer);

console.log('Default:', store.getState());

// Thuc hien cong viec thay doi status
const action = {
    type: 'TOGGLE_STATUS'
};

// luc nay action o tren myReDucer chinh la action nay
store.dispatch(action);

console.log('TOGGLE_STATUS', store.getState());

