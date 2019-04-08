/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import {
  ADD,
  DELETE,
  LOAD_LIST
} from '../constants/todos'

export const add = (data) => {
  return {
    data,
    type: ADD
  }
}

export const del = (id) => {
  return {
    id,
    type: DELETE
  }
}

export const loadList = (payload) => {
  console.log("=== action payload -=-> ",payload)
  return {
    payload,
    type: LOAD_LIST,
  }
}

