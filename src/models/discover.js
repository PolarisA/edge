import { delay, isEmpty, isEmptyObject } from '../utils'


export default {
  namespace: 'discover',
  state: {
    loading: false,
    searchKey: ''
  },
  effects: {
    async loadLocation() {
      console.log("==== loadLocation ")
    }
  },
  reducers: {
    setLoading(action, state) {
      return { ...state, loading: true }
    },

  }
}
