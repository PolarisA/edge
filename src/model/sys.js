export default {
  namespace: 'sys',
  state: {},

  effects: {
    * error({ payload: e }, { all, call, put }) {
      console.error("error:", e);
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
