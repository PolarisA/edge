/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Button,
  ScrollView,
} from '@tarojs/components'

import './index.scss'

const profile = [
  {title: '勋章', numbers: 5, icon: ''},
  {title: '手机号', numbers: 0, icon: ''},
  {title: '卡片信息', numbers: 9, icon: ''},
  {title: '优惠券', numbers: 2, icon: ''},
]

class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    super()
    this.state = {
      profile,
    }
  }

  onItemClick = (profile) => {
    console.log("== onItemClick  profile -=->", profile)

  }

  render() {
    const {profile} = this.state
    return (
      <ScrollView className='mine-page'>
        <View className='mine-header'>
          <View className='mine-item-header'>
            <Text className='header-font'>
              登录
            </Text>
          </View>

          <View className='mine-icon-size'>
            <Text>
              hello
            </Text>
          </View>
        </View>

        <View className='mine-item'>
          {
            profile.map((item, index) => {
              return (
                <View key={index} className='mine-item-view'>
                  <Text>
                    index
                  </Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

export default Mine
