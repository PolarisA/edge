/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import { combineReducers } from 'redux'
import { loadListServer } from '../service/home'
import { ADD, DELETE, LOAD_LIST } from '../constants/todos'
import api from '../service/api'

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
      console.log("==== todos action -=--> ", action)

      const data = loadHomeList(action.payload)
      return {
        ...state,
        loading: true,
        // data
      }


    default:
      return state
  }
}

const loadHomeList = async function (payload) {
  console.log("==== loadHomeList payload -=--> ", payload)
  // const { data } = await loadListServer(payload)

  const res = await api.get('?apikey=0b2bdeda43b5688921839c8ecb20399b&city=北京')
  console.log("==== loadHomeList res -=--> ", res)
  return res
}


export default combineReducers({
  todos
})
