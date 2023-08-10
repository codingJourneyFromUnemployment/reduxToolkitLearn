const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = "cake_ordered"
const CAKE_RESTOCKED = "cake_restocked"


function cakeOrdered(quantity) {
    return {
      type: CAKE_ORDERED,
      quantity: quantity
    }
}

function cakeRestocked(quantity) {
    return {
      type: CAKE_RESTOCKED,
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
      case CAKE_RESTOCKED: return { 
            ...state,
            numOfCakes: state.numOfCakes + action.quantity
        }
        default: return state
    }
}

const store = createStore(reducer)
console.log('Initial state', store.getState())  

//注册一个监听器，用于在每次 state 更新时打印日志，它返回一个函数用于注销监听器
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

store.dispatch(cakeOrdered(2))
store.dispatch(cakeOrdered(2))
store.dispatch(cakeOrdered(2))

store.dispatch(cakeRestocked(1))
store.dispatch(cakeRestocked(1))
store.dispatch(cakeRestocked(1))

unsubscribe()
