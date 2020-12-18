import { createStore } from 'redux';


/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 */
function counterReducer(state = 0, action) {
  let type = action.type;
  if (type == 'INCREMENT') {
    return state + 1;
  }
  if (type == 'DECREMENT') {
    return state - 1;
  }

  return state;
}


// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer)


// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
store.subscribe(() => console.log(store.getState()))



// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
let incrementAction = { type: 'INCREMENT' };
let decrementAction = { type: 'DECREMENT' };

store.dispatch(incrementAction);
store.dispatch(incrementAction);

store.dispatch(decrementAction);
store.dispatch(decrementAction);
store.dispatch(decrementAction);
