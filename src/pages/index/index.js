import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Image,
  Button
} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import './index.scss'

@connect(({ home }) => ({ home }))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onBtnClick() {
    const params = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '北京',
    }

    dispatcher.home.asyncAdd(params)
  }

  render() {
    console.log("=== index props -=-> ", this.props)

    return (
      <View className='page-homepage'>
        <View className='page-top'>
          <Text className='page-top-txt'>
            hello Index
          </Text>
        </View>


        <Button className='home-btn' onClick={this.onBtnClick}>
          <Text className='home-btn-txt'>Load Data</Text>
        </Button>

      </View>
    )
  }
}

export default Index
