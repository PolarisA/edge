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

import { AtNoticebar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import { delay } from '../../utils/index'
import { pType, share_logo } from '../../constants/config'

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
import ic_sport from '../../images/mine/ic_sport_value.png'
import ic_coach from '../../images/mine/ic_perfile.png'

const personal = [
  { title: '我的预约', dName: '', type: pType.RESERVATION, icon: ic_cafe, screen: 'pages/mine/profile/Detail?' },
  { title: '我的运动量', dName: '', type: pType.EXERCISES, icon: ic_sport, screen: 'pages/mine/profile/List?' },
  { title: '邀请奖励', dName: '', type: pType.BLOCK_INVITES, icon: ic_gifts, screen: 'pages/mine/profile/List?' },
  { title: '打卡记录', dName: '', type: pType.DEFINE_MUTEX, icon: ic_done, screen: 'pages/mine/profile/Detail?' },
  { title: '系统消息', dName: '', type: pType.SYSTEM_MESSAGE, icon: ic_news, screen: 'pages/mine/profile/List?' },
  { title: '申请教练', dName: 'apply', type: pType.AUTO_INCREMENT, icon: ic_coach, screen: 'pages/mine/profile/FeedBack?' },
  { title: '问题反馈', dName: 'feedback', type: pType.PUBLIC_MENU_CONTACT, icon: ic_face, screen: 'pages/mine/profile/FeedBack?' },
]

const tabCards = [
  { name: '会员卡', icon: ic_vip_card, screen: 'pages/mine/tabs/Vips' },
  { name: '优惠券', icon: ic_shell, screen: 'pages/mine/tabs/Certificate' },
  { name: '课程', icon: ic_calendar, screen: 'pages/mine/tabs/Course' },
  { name: '私教', icon: ic_teacher, screen: 'pages/mine/tabs/Coach' },
]

@connect(({ mine }) => ({ mine }))
class Mine extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor() {
    super()
    this.state = {
      personal,
      avatarUrl: '',
      nickName: '',
      isLogin: false,
    }
  }

  componentDidMount() {
    Taro.getStorage({ key: 'userInfo' })
      .then(res => {
        console.log(">>> res >>", res)
        const {
          nickName,
          avatarUrl,
        } = res.data

        this.setState({
          nickName,
          avatarUrl,
          isLogin: true,
        })
      }).catch(err => {
      console.log(">>> err >>", err)
    })
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  async getUserInfo(userInfo) {
    console.log("=== getUserInfo == userInfo >>> ", userInfo)

    await this._showLoading(true)
    await delay(500)

    this.setBasicInfo(userInfo)
    await this._showLoading(false)
  }

  setBasicInfo = (userInfo) => {
    console.log("=== userInfo =->", userInfo)

    if (userInfo.detail.userInfo) {
      dispatcher.mine.saveUserInfo(userInfo.detail.userInfo)
      const {
        avatarUrl,
        nickName,
      } = userInfo.detail.userInfo

      this.setState({
        avatarUrl,
        nickName,
        isLogin: true,
      })

      Taro.setStorage({ key: 'userInfo', data: userInfo.detail.userInfo })
        .then(rst => {
          //将用户信息存入缓存中
          console.log("=== rst >>> ", rst)
        })
    }
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
    const { screen, type, dName } = item

    Taro.navigateTo({
      url: `/${screen}&type=${type}&base=${dName}`
    })
  }

  render() {
    const {
      personal,
      isLogin,
      avatarUrl,
      nickName,
    } = this.state
    console.log("=== Mine props ", this.props)
    console.log('=*** Mine state ***=> ', this.state)

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
              <Image className='mine-header-avatar' src={isLogin ? avatarUrl : ic_header}/>
            </View>
            <Text className='mine-header-name-txt'>
              {isLogin ? `${nickName}` : '未登录'}
            </Text>
          </View>

          <View className='mine-header-block-bar'>
            <Image src={ic_vip} className='mine-vip-box'/>
            <AtNoticebar className='mine-header-block-marquee' marquee>
              {'新店启动3个月内免费开通会员,点击列表查看站点详情介绍'}
            </AtNoticebar>
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
          <View className='mine-item-view'>
            <Image src={ic_data} className='mine-item-icon'/>
            <Button
              className='mine-middle-btn'
              showMessageCard={true}
              sendMessageImg={share_logo}
              sendMessageTitle={'请在下方输入联系客服'}
              sendMessagePath={`/pages/mine/index`}
              openType="contact"
              hoverClass='none'>
              <Text className='mine-customer-btn-txt'>
                {'联系客服'}
              </Text>
            </Button>

            <Image src={ic_right} className='mine-item-right-icon'/>
          </View>
        </View>
        {
          !!isLogin ? <View className='mine-bottom-space-view'/> :
            <Button
              className='mine-login-btn'
              size='default'
              type='primary'
              style='background-color:#0068C4'
              open-type='getUserInfo'
              onGetUserInfo={this.getUserInfo}>
              <Text className='mine-login-btn-txt'>
                {'授权登录'}
              </Text>
            </Button>
        }
      </ScrollView>
    )
  }
}

export default Mine
