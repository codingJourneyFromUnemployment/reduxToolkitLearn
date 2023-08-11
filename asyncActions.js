const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

//定义initialState
const initialState = {
  loading: false,
  users: [],
  error: ''
}

//定义三个常量，用于标识 action 的类型
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

//定义三种 action的creator function
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

//定义 reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: return {
      ...state,
      loading: true
    }
    case FETCH_USERS_SUCCESS: return {
      loading: false,
      users: action.payload,
      error: ''
    }
    case FETCH_USERS_FAILURE: return {
      loading: false,
      users: [],
      error: action.payload
    }
    default: return state
  }
}

//定义 store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

//定义action creator(这里是一个数据获取函数)，dispatch action本来是同步的，但是使用了thunkMiddleware之后，就可以在action creator中返回一个函数（这里是一个箭头函数），这个函数接收dispatch作为参数，这样就可以在函数体内进行异步操作，然后再dispatch action，实现了dispatch action的异步操作
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
      // response.data is the users
      const users = response.data.map(user => user.id)
      dispatch(fetchUsersSuccess(users))
    }).catch(error => {
      // error.message is the error message
      dispatch(fetchUsersFailure(error.message))
    })
  }
}

//定义订阅函数
const unsubscribe = store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())
