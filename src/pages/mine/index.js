/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'

import './index.scss'

class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return(
      <View className='mine page'>
        <Text>
          {'profile '}
        </Text>

      </View>
    )
  }
}

export default Mine
