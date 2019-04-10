/**
 * @Author : HuiWen
 * @Date : 2019-04-11
 * @Description :
 **/
export default {
  namespace: 'common',
  state: {},
  reducers: {
    update({ payload }, state) {
      return { ...state, ...payload }
    }
  }
}
