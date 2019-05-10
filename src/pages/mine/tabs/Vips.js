/**
 * @Author : HuiWen
 * @Date : 2019-05-10
 * @Description :
 **/
import Taro, {Component} from '@tarojs/taro'
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
        <View className='vip-card-view'>
          <View className='vip-card-title'>
            <Text className='vip-card-title-txt'>
              {'柒橙卡 NO.014051'}
            </Text>

            <View className='vip-card-date-content'>
              <Text className='vip-card-date-txt'>
                {'有效期至'}
              </Text>
              <Text className='vip-card-date-txt'>
                {'2020-05-01'}
              </Text>
            </View>
          </View>

        </View>


      </View>
    )
  }
}

export default Vips
