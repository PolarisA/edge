import { delay } from '../utils'
import { getHomeList } from '../service/home'

const regeneratorRuntime = require('../lib/regenerator/runtime.js')

export default {
  namespace: 'home',
  state: {
    num: 0,
    loading: false,
  },
  effects: {
    async asyncAdd({ payload }, { call, put }) {
      await put({ type: 'showLoading' })


      console.log("=== asyncAdd payload -=--> ", payload)

    },

  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true }
    },
    add(action, state) {
      return { ...state, num: state.num + 1 }
    },
    minus(action, state) {
      return { ...state, num: state.num - 1 }
    },
  },
}
