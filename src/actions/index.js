/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import {
  ADD,
  DELETE,
  RELOAD,
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

export const load = (payload) => {
  return {
    payload,
    type: RELOAD,
  }
}
