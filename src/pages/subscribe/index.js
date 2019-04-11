/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text, Map } from '@tarojs/components'

import './index.scss'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

@connect(({ discover }) => ({ discover }))
class Subscribe extends Component {
  config = {
    navigationBarTitleText: '订阅'
  }

  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log("=== discover props >> ", this.props)
    return (
      <View className='discover-page'>
        <Map
          className='map-page'
          longitude={116.480913}
          latitude={39.996717}
          scale={15}

        />

      </View>
    )
  }
}

export default Subscribe
