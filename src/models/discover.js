import { delay, isEmpty, isEmptyObject } from '../utils'
import { getLocationInfo } from '../service/discover'

export default {
  namespace: 'discover',
  state: {
    loading: false,
    lbsInfo: {},
  },
  effects: {
    async getLSBInfo(action, { call, put }) {
      await put({ type: 'setLoading' })

      const restFul = await getLocationInfo(action.payload)

      await put({
        type: 'setLoad'
      })

      console.log("==== loadLocation restFul  -=-=>", restFul)
    }
  },
  reducers: {
    setLoading(action, state) {
      return { ...state, loading: true }
    },

    setLoad(action, state) {
      return { ...state, loading: false }
    },

  }
}
