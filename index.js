const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

// 这一步是在定义一个常量，用于标识 action 的类型
const CAKE_ORDERED = "cake_ordered"
const CAKE_RESTOCKED = "cake_restocked"
const ICECREAM_ORDERED = "icecream_ordered"
const ICECREAM_RESTOCKED = "icecream_restocked"

// 这一步是在定义一个 action，它是一个对象，其中 type 属性用于标识 action 的类型，payload 属性用于传递数据
function cakeOrdered(quantity) {
  return {
    type: CAKE_ORDERED,
    payload: quantity
  }
}

function cakeRestocked(quantity) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity
  }
}

function icecreamOrdered(quantity) {
  return {
    type: ICECREAM_ORDERED,
    payload: quantity
  }
}

function icecreamRestocked(quantity) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity
  }
}

// 这一步是在定义一个 reducer，它是一个函数，它接收两个参数，第一个参数是 state，第二个参数是 action，它返回一个新的 state
// const initialState = {
//   numOfCakes: 10,
//   numOfIcecreams: 20
// }
const initialCakeState = {
  numOfCakes: 10
}
const initialIcecreamState = {
  numOfIcecreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED: return {
      ...state,
      numOfCakes: state.numOfCakes - action.payload
    }
    case CAKE_RESTOCKED: return {
      ...state,
      numOfCakes: state.numOfCakes + action.payload
    }
    default: return state
  }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED: return {
      ...state,
      numOfIcecreams: state.numOfIcecreams - action.payload
    }
    case ICECREAM_RESTOCKED: return {
      ...state,
      numOfIcecreams: state.numOfIcecreams + action.payload
    }
    default: return state
  }
}

rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer
})

// 这一步是在创建一个 store，它接收一个 reducer 作为参数
const store = createStore(rootReducer, applyMiddleware(logger))
// console.log('Initial state', store.getState())

//注册一个监听器，用于在每次 state 更新时打印日志，它返回一个函数用于注销监听器
// const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

// store.dispatch(cakeOrdered(2))
// store.dispatch(cakeOrdered(2))
// store.dispatch(cakeOrdered(2))

// store.dispatch(cakeRestocked(1))
// store.dispatch(cakeRestocked(1))
// store.dispatch(cakeRestocked(1))

const cakeActions = bindActionCreators({ cakeOrdered, cakeRestocked }, store.dispatch)
const icecreamActions = bindActionCreators({ icecreamOrdered, icecreamRestocked }, store.dispatch)

cakeActions.cakeOrdered(2)
cakeActions.cakeRestocked(1)

icecreamActions.icecreamOrdered(3)
icecreamActions.icecreamRestocked(4)

// unsubscribe()
