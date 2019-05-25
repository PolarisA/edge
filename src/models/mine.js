import Taro from '@tarojs/taro'

export default {
  namespace: 'mine',
  state: {
    loading: false,
    avatarUrl: '',
    userInfo: {},
  },

  effects: {
    async saveUserInfo(action, { call, put }) {
      const db = wx.cloud.database()

      console.log("== saveUserInfo action -=-> ", action)
      const { payload } = action

      db.collection('user').add({
        data: {
          description: 'insert userInfo',
          due: new Date().getTime(),
          userInfo: { ...payload },
        },
        success: res => {
          console.log("### success res -=-> ", res)
          const { _id } = res
          Taro.setStorage({ key: 'userId', data: _id })
            .then(res => {
              //将用户信息存入缓存中
              console.log("### rst -=-> ", res)
            })
        },
        fail: err => {
          console.log("### fail err -=-> ", err)
          Taro.showToast({ title: '数据存入失败，请重试' })
        }
      })
    },
  },

  reducers: {
    setLoading(action, state) {
      return { ...state, loading: true }
    },

    setLoad(action, state) {
      return { ...state, loading: false }
    },
  },
}
