import Taro from '@tarojs/taro'
import action from "../utils/action";
import request from "../utils/request";
import { delay } from "../utils";

export default {
  namespace: 'home',
  state: {
    list: [],
    loading: false,
  },

  effects: {
    * load({ payload }, { all, call, put }) {
      console.log("==== load payload -=-> ", payload)

      let { data } = yield call(request, {
        url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", { list: data }))
    },

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMore(state, { payload: list }) {
      return { ...state, list: [...state.list, ...list] };
    },
  },
};
