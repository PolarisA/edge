import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import configStore from './store'
import Index from './pages/index'

import './app.scss'

global.regeneratorRuntime = require('./lib/regenerator/runtime-module')
const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/subscribe/index',
      'pages/mine/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '位置',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home-active.png',
        },
        {
          pagePath: 'pages/subscribe/index',
          text: '预约',
          iconPath: './images/tab/cart.png',
          selectedIconPath: './images/tab/cart-active.png',
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png',
        },
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  }

  componentDidMount() {
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
