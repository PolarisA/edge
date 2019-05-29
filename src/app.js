import '@tarojs/async-await'
import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'

import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'

import zoro from '@opcjs/zoro' // 引入zoro
import {createLoading} from '@opcjs/zoro-plugin'
import models from './models/index'
import mixins from './mixins'

import './app.scss'

const app = zoro({
  onError(error) {
    if (error.message) {
      Taro.showToast({
        icon: 'none',
        title: error.message,
        duration: 2000,
      })
    }
  }
})

app.use(mixins)
app.use(createLoading())
app.model(models)

const store = app.start(false)

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/index/detail/Detail',
      'pages/subscribe/index',
      'pages/mine/index',
      'pages/mine/tabs/Vips',
      'pages/mine/tabs/Certificate',
      'pages/mine/tabs/Course',
      'pages/mine/tabs/Coach',
      'pages/mine/profile/Detail',
      'pages/mine/profile/FeedBack',
      'pages/mine/profile/List',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于为你提供附近的服务站点"
      }
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
          text: "位置",
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
    wx.cloud.init({
      env: 'qcitycloud-cffa3a', // 前往云控制台获取环境 ID
      traceUser: true // 是否要捕捉每个用户的访问记录。设置为 true，用户可在管理端看到用户访问记录
    })
    app.setup()
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
