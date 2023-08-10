const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = "cake_ordered"


function cakeOrdered(quantity) {
    return {
      type: CAKE_ORDERED,
        quantity: quantity
    }
}

const initialState = {
  numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case CAKE_ORDERED: return {
            ...state,
            numOfCakes: state.numOfCakes - action.quantity
        }
        default: return state
    }
}

const store = createStore(reducer)
console.log('Initial state', store.getState())  

const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

store.dispatch(cakeOrdered(2))
store.dispatch(cakeOrdered(2))
store.dispatch(cakeOrdered(2))

unsubscribe()
