/**
 * @Author : HuiWen
 * @Date : 2019-05-25
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
import { AtIcon } from 'taro-ui'

import './style.scss'

class FeedBack extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    console.log("=== FeedBack props -=-> ", this.props)

    return (
      <View className='profile-page'>
        <Text>
          {'FeedBack'}
        </Text>
      </View>
    )
  }
}

export default FeedBack
