import { delay, isEmpty, isEmptyObject } from '../utils'
import { getHomeList } from '../service/home'

export default {
  namespace: 'home',
  state: {
    loading: false,
    subjects: [],
    count: 0,
    total: 1,
    title: '',
  },

  effects: {
    async loadList(action, { call, put }) {
      await put({ type: 'setLoading' })

      const restFul = await getHomeList(action.payload)

      if (!isEmptyObject(restFul)) {
        await put({
          type: 'loadListSucc',
          payload: restFul,
        })
      } else {
        await put({
          type: 'setLoad'
        })
      }
    },
  },

  reducers: {
    setLoading(action, state) {
      return { ...state, loading: true }
    },

    setLoad(action, state) {
      return { ...state, loading: false }
    },

    loadListSucc(action, state) {
      console.log("=== loadListSucc action -=-> ", action.payload)

      return { ...state, ...action.payload, loading: false }
    },
  },
}
