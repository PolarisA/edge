/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Button,
  Image,
  ScrollView,
} from '@tarojs/components'

import './index.scss'

const profile = [
  { title: '勋章', numbers: 5, desc: '🐒🐒🐒', icon: '' },
  { title: '手机号', numbers: 0, desc: '15354872777', icon: '' },
  { title: '卡片信息', numbers: 9, desc: '一年期会员', icon: '' },
  { title: '优惠券', numbers: 2, desc: '3张', icon: '' },
]

import ic_header from '../../images/head.png'
import ic_start from '../../images/start.png'

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


  render() {
    const { profile } = this.state
    return (
      <ScrollView className='mine-page'>
        <View className='mine-header-card'>
          <View className='mine-header-title'>
            <Image className='mine-header-avatar' src={ic_header}/>

            <Text className='mine-header-name-txt'>
              {'授权登录'}
            </Text>
          </View>
          <View className='mine-header-tips'>
            <Text className='mine-header-tips-txt'>
              {'柒橙二十四科技有限公司'}
            </Text>
          </View>
        </View>

        <View className='mine-item'>
          {
            profile.map((item, index) => {
              return (
                <View key={index} className='mine-item-view'>
                  <View className='mine-item-list-view'>
                    {
                      index === 0 ?
                        <View className='mine-item-content'>
                          <Image className='mine-item-start' src={ic_start}/>
                          <Image className='mine-item-start' src={ic_start}/>
                          <Image className='mine-item-start' src={ic_start}/>
                        </View> :
                        <Text className='mine-item-value-txt'>
                          {item.desc}
                        </Text>
                    }
                  </View>

                  <View className='mine-item-list-tips'>
                    <Text className='mine-header-tips-txt'>
                      {item.title}
                    </Text>
                  </View>
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
