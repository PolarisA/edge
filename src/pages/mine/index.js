/**
 * @Author : HuiWen
 * @Date : 2019-04-08
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

import ic_header from '../../images/mine/head.png'
import ic_right from '../../images/item/ic_right.png'

import ic_vip from '../../images/mine/ic_vip.png'
import ic_vip_card from '../../images/mine/ic_vip_card.png'
import ic_shell from '../../images/mine/ic_shell.png'
import ic_calendar from '../../images/mine/ic_calendar.png'
import ic_teacher from '../../images/mine/ic_teacher.png'

import ic_cafe from '../../images/mine/ic_cafe.png'
import ic_data from '../../images/mine/ic_data.png'
import ic_done from '../../images/mine/ic_done.png'
import ic_face from '../../images/mine/ic_face.png'
import ic_news from '../../images/mine/ic_news.png'
import ic_gifts from '../../images/mine/ic_gifts.png'


const personal = [
  { title: '我的预约', desc: '', icon: ic_cafe, screen: '' },
  { title: '系统消息', desc: '', icon: ic_news, screen: '' },
  { title: '邀请奖励', desc: '已邀请', icon: ic_gifts, screen: '' },
  { title: '燃脂计划', desc: '', icon: ic_data, screen: '' },
  { title: '打卡记录', desc: '', icon: ic_done, screen: '' },
  { title: '联系客服', desc: '3张', icon: ic_face, screen: '' },
]

const tabCards = [
  { name: '会员卡', icon: ic_vip_card, screen: 'pages/mine/tabs/Vips' },
  { name: '优惠券', icon: ic_shell, screen: 'pages/mine/tabs/Certificate' },
  { name: '课程', icon: ic_calendar, screen: 'pages/mine/tabs/Course' },
  { name: '私教', icon: ic_teacher, screen: 'pages/mine/tabs/Coach' },
]

class Mine extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor() {
    super()
    this.state = {
      personal,
    }
  }

  onLogin = () => {
    console.log("=== Login === ")

  }

  onTabBarClick(item) {
    console.log("=== onTabBarClick item -=-> ", item)
    const { screen } = item
    Taro.navigateTo({
      url: `/${screen}`
    })
  }

  onPersonalClick(item) {
    console.log("== onPersonalClick item -=->", item)

  }

  render() {
    const { personal } = this.state
    const scrollStyle = {
      height: '150px'
    }

    return (
      <ScrollView
        className='mine-page'
        scrollY={true}
        scrollWithAnimation
        scrollTop={0}
        lowerThreshold={20}
        upperThreshold={20}>
        <View className='mine-header-card'>
          <View className='mine-header-title'>
            <View className='mine-header-box'>
              <Image className='mine-header-avatar' src={ic_header}/>
            </View>
            <Text className='mine-header-name-txt'>
              {'未登录'}
            </Text>
          </View>

          <View className='mine-header-block-bar'>
            <Image src={ic_vip} className='mine-vip-box'/>

            <View className='mine-header-block-tips'>
              <Text className='mine-header-block-tips-txt'>
                {'新店启动3个月内免费开通会员'}
              </Text>
            </View>
          </View>
        </View>

        <View className='mine-header-tab-block'>
          {
            tabCards.map((item, index) => {
              return (
                <View key={`${index}`} className='mine-header-card-item' onClick={() => this.onTabBarClick(item)}>
                  <Image src={item.icon} className='mine-header-card-icon'/>
                  <Text className='mine-header-card-txt'>
                    {item.name}
                  </Text>
                </View>
              )
            })
          }
        </View>

        <View className='mine-item'>
          {
            personal.map((item, index) => {
              return (
                <View key={`${index}`} className='mine-item-view' onClick={() => this.onPersonalClick(item)}>
                  <Image src={item.icon} className='mine-item-icon'/>
                  <View className='mine-header-item-txt'>
                    <Text className='mine-item-txt'>
                      {item.title}
                    </Text>
                  </View>

                  <Image src={ic_right} className='mine-item-right-icon'/>
                </View>
              )
            })
          }
        </View>

        <Button
          className='mine-login-btn'
          size='default'
          type='primary'
          style='background-color:#0068C4'
          onClick={this.onLogin}>
          <Text className='mine-login-btn-txt'>
            {'授权登录'}
          </Text>
        </Button>

      </ScrollView>
    )
  }
}

export default Mine
