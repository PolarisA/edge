/**
 * @Author : HuiWen
 * @Date : 2019-05-10
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

import './index.styles.scss'

class Vips extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("=== Vips props -=-> ", this.props)

    return (
      <View className='vips-page'>

        <Text>
          {'hello'}
        </Text>
      </View>
    )
  }
}

export default Vips