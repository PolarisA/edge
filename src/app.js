import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './model'
import action from './utils/action'
import Index from './pages/index'

import './app.scss'


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/subscribe/index',
      'pages/mine/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [
        {
          pagePath: 'pages/index/index',
          text: "首页",
          iconPath: "./images/tab/index.png",
          selectedIconPath: "./images/tab/index_focus.png"
        },
        {
          pagePath: 'pages/subscribe/index',
          text: "发现",
          iconPath: "./images/tab/discovery.png",
          selectedIconPath: "./images/tab/discovery_focus.png"
        },
        {
          pagePath: 'pages/mine/index',
          text: "我的",
          iconPath: "./images/tab/burger.png",
          selectedIconPath: "./images/tab/burger_focus.png"
        },
      ],
    },
  }

  componentDidMount() {
    // dvaApp.dispatch({ type: 'sys/test' })
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
