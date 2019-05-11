/**
 * @Author : HuiWen
 * @Date : 2019-05-11
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
} from '@tarojs/components'

import './index.scss'

class Arch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("=== Arch props -=-> ", this.props)

    return (
      <View className='arch-content'>


      </View>
    )
  }
}

export default Arch
