import { combineReducers } from 'redux'
import { getHomeList } from '../service/home'
import { ADD, DELETE, LOAD_LIST } from '../constants/todos'

const regeneratorRuntime = require('../lib/regenerator/runtime.js')

// 定义初始状态
const INITIAL_STATE = {
  todos: [
    { id: 0, text: '第一条todo' }
  ],
  loading: false,
  param: {}
}

function todos(state = INITIAL_STATE, action) {
  // 获取当前todos条数，用以id自增
  const todoNum = state.todos.length

  switch (action.type) {
    // 根据指令处理todos
    case ADD:
      return {
        ...state,
        todos: state.todos.concat({
          id: todoNum,
          text: action.data
        })
      }
    case DELETE:
      let newTodos = state.todos.filter(item => {
        return item.id !== action.id
      })

      return {
        ...state,
        todos: newTodos
      }

    case LOAD_LIST:
      
      return {
        ...state,
        loading: true,
        // data
      }


    default:
      return state
  }
}

export default combineReducers({
  todos
})
