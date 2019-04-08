import { LOAD_LIST } from "../constants/todos";

export const loadList = (payload) => {
  return {
    payload,
    type: LOAD_LIST,
  }
}
