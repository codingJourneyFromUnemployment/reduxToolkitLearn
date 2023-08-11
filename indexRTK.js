const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const iceCreamActions = require('./features/icecream/icecreamSlice').iceCreamActions;

// console.log('Initial state: ', store.getState());
// const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

store.dispatch(cakeActions.ordered(2));
store.dispatch(cakeActions.restocked(5));
store.dispatch(iceCreamActions.ordered(3));
store.dispatch(iceCreamActions.restocked(10));

// unsubscribe();

