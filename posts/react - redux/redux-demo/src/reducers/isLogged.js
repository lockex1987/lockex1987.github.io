// REDUCER
const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            //return true;
            return !state;
        default:
            return false;
    }
};

export default isLoggedReducer;