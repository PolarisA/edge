/**
 * @Author : HuiWen
 * @Date : 2019-05-17
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import {
  View,
  Text,
  Image,
  Swiper,
  ScrollView,
  SwiperItem
} from '@tarojs/components'

import { setMockData } from '../../../utils/index'
import { deviceIcon, teamBuy, orderSort, commentStart } from '../../../constants/config'

import './Detail.style.scss'

import ic_map from '../../../images/item/location.png'
import ic_tel from '../../../images/item/ic_tel_24.png'
import ic_sport from '../../../images/home/ic_sport.png'
import ic_write from '../../../images/home/ic_drink.png'
import ic_buy from '../../../images/home/ic_buyforteam.png'

import ic_orders from '../../../images/home/ic_orders.png'
import ic_comment from '../../../images/home/ic_comment.png'

import ic_flag from '../../../images/home/ic_flag.png'
import ic_time from '../../../images/home/ic_time.png'
import ic_burn from '../../../images/home/ic_burn.png'


const QQMapLib = require('../../../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');

class Detail extends Component {
  config = {
    navigationBarTitleText: ''
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      info: {},
      shopPic: [],
      orderList: [],
      commentList: [],
      address: '',
      appoint: false,
      collect: false,
    }
  }

  componentDidMount() {
    const { ...params } = this.$router.params
    const qqMapSdk = new QQMapLib({
      key: 'MQ6BZ-M5X3V-WNFPA-U63GN-PFFIH-R3BQZ'
    })

    this.initMockData()
    this.initCloud(params, qqMapSdk)
  }

  async initCloud(params, qqMapSdk) {
    this._showLoading(true)
    const { id, shopId } = params
    const db = wx.cloud.database()

    await db.collection('shop')
      .doc(`${id}`)
      .get()
      .then(res => {
        console.log("=== res -=--> ", res.data)
        const info = res.data

        wx.getLocation({
          type: 'gcj02',
          success: res => {
            qqMapSdk.reverseGeocoder({
              location: {
                latitude: info.latitude,
                longitude: info.longitude
              },
              success: addressRes => { //成功后的回调
                console.log("=== addressRes -> ", addressRes)
                const {
                  result: {
                    address,
                    formatted_addresses: {
                      recommend
                    }
                  }
                } = addressRes

                let addrezz = address + recommend
                console.log("=== address -=--> ", address)

                this.setState({
                  info,
                  shopPic: info.shopPic,
                  address: addrezz,
                })
              },
              fail: error => {
                console.error('+++ error ->', error);
              },
              complete: addressRes => {
                console.log(addressRes);
              }
            })
          },
          fail: error => {
            console.log("*** error -> ", error)
          }
        })

        this._showLoading(false)
        Taro.setNavigationBarTitle({ title: info.name })
      })
  }

  async initMockData() {
    let orderList = await setMockData(parseInt(Math.random() * 8) + 1, 'ORDER')
    let commentList = await setMockData(parseInt(Math.random() * 35), 'COMMENT')
    this.setState({
      orderList,
      commentList,
    })
  }

  onAppoint = () => {
    Taro.showToast({ title: `${!!this.state.appoint ? '已取消预约' : '已预约'}` })
    this.setState({
      appoint: !this.state.appoint
    })
  }

  onCollect = () => {
    Taro.showToast({ title: `${!!this.state.collect ? '已取消收藏' : '已收藏'}` })
    this.setState({
      collect: !this.state.collect
    })
  }

  onShowMapDetail = () => {

  }

  render() {
    console.log("==== Detail params --> ", this.$router.params)
    console.log("==== Detail props --> ", this.props)
    console.log("==== Detail state --> ", this.state)

    const {
      shopPic,
      info,
      address,
      orderList,
      commentList,
      appoint,
      collect,
    } = this.state

    return (
      <View className='detail-page'>
        <ScrollView
          className='home-detail-page'
          scrollY={true}
          scrollWithAnimation
          scrollTop={0}
          lowerThreshold={20}
          upperThreshold={20}>
          <Swiper
            className='home-detail-banner'
            indicatorColor='#dcd'
            indicatorActiveColor='#fff'
            vertical={false}
            circular={true}
            duration={2400}
            indicatorDots={true}
            autoplay={true}>
            {
              shopPic.map((item, index) => {
                return (
                  <SwiperItem key={`${index}`}>
                    <Image className='home-detail-shopPic-item' src={item}/>
                  </SwiperItem>
                )
              })
            }
          </Swiper>

          <View className='home-detail-status-bar'>
            <View className='home-detail-status-block'>
              <Image src={ic_sport} className='home-detail-status-icon'/>
              <Text className='home-detail-status-txt'>{`运动:${info && info.NumberNow || 0}人`}</Text>
            </View>
            <View className='home-detail-line'/>
            <View className='home-detail-status-block'>
              <Image src={ic_write} className='home-detail-status-icon'/>
              <Text className='home-detail-status-txt'>{`预约:${info && info.appoint || 0}人`}</Text>
            </View>
          </View>

          <View className='home-detail-status-place'>
            <View className='home-detail-location-icon'>
              <Image src={ic_map} className='home-detail-map-icon'/>
            </View>
            <View className='home-detail-location-info' onClick={this.onShowMapDetail}>
              <Text className='home-detail-status-txt'>{address}</Text>
            </View>

            <View className='home-detail-location-line'/>
            <View className='home-detail-location-cell' onClick={
              () => {
                wx.makePhoneCall({
                  phoneNumber: '17600482550',
                })
              }}>
              <Image src={ic_tel} className='home-detail-tel-icon'/>
              <Text className='home-detail-status-txt'>{'电话'}</Text>
            </View>
          </View>

          <View className='home-detail-device-bar'>
            {
              !!info && info.deploys ?
                (info.deploys).map((item, index) => {
                  return (
                    <View key={`${index}`} className='home-detail-device-tab'>
                      <Image src={deviceIcon[item.type]} className='home-detail-device-tab-icon'/>
                      <Text className='home-detail-device-tab-txt'>
                        {item.name}
                      </Text>
                    </View>
                  )
                }) : null
            }
          </View>

          <View className='home-detail-buy-title-bar'>
            <Image src={ic_buy} className='home-detail-buy-icon'/>
            <Text className='home-detail-status-txt'>
              {'团购'}
            </Text>

            <View className='home-detail-buy-tips'>
              <AtIcon value='clock' size='15' color='#DEDEDE'/>
              <Text className='home-detail-buy-tips-txt'>{'随时退'}</Text>
              <AtIcon value='clock' size='15' color='#DEDEDE'/>
              <Text className='home-detail-buy-tips-txt'>{'过期退'}</Text>
              <AtIcon value='clock' size='15' color='#DEDEDE'/>
              <Text className='home-detail-buy-tips-txt'>{'免预约'}</Text>
            </View>
          </View>

          <View className='home-detail-buyForTeam'>
            {
              teamBuy.map((item, index) => {
                return (
                  <View key={`${index}`} className='home-detail-teambuy-item'>
                    <Image src={item.picUrl} className='home-detail-item-icon'/>
                    <View className='home-detail-item-content'>
                      <Text className='home-detail-item-title-txt'>
                        {item.title}
                      </Text>

                      <Text className='home-detail-item-now-txt'>
                        {`￥${item.nowPrice}`}
                        <Text className='home-detail-item-origin-txt'>
                          {`￥${item.originPrice}`}
                        </Text>
                      </Text>
                    </View>
                    <Text className='home-detail-item-desc-txt'>
                      {item.desc}
                    </Text>
                  </View>
                )
              })
            }
          </View>

          <View className='home-detail-charts-view-title-bar'>
            <Image src={ic_orders} className='home-detail-buy-icon'/>
            <Text className='home-detail-status-txt'>{'周燃脂排行'}</Text>
          </View>

          <View className='home-detail-charts-view-bar'>
            <View className='home-detail-charts-bar-order'>
              <Image src={ic_flag} className='home-detail-charts-bar-icon'/>
              <Text className='home-detail-status-txt'>{'排名'}</Text>
            </View>

            <View className='home-detail-charts-bar-time'>
              <Image src={ic_time} className='home-detail-charts-bar-icon'/>
              <Text className='home-detail-status-txt'>{'耗时'}</Text>
            </View>

            <View className='home-detail-charts-bar-burn'>
              <Image src={ic_burn} className='home-detail-charts-bar-icon'/>
              <Text className='home-detail-status-txt'>{'燃脂'}</Text>
            </View>
          </View>

          <View className='home-detail-charts-view'>
            {
              orderList.map((item, index) => {
                return (
                  <View key={`${index}`} className='home-detail-charts-burn'>
                    <View className='home-detail-charts-item-order'>
                      <Image src={orderSort[index]} className='home-detail-item-avatar'/>
                      <Text className='home-detail-item-name-txt'>{item.name}</Text>
                    </View>

                    <View className='home-detail-charts-item-time'>
                      <Text className='home-detail-item-content-txt'>
                        {`用时:${item.time}`}
                      </Text>
                    </View>

                    <View className='home-detail-charts-item-burn'>
                      <Text className='home-detail-item-content-txt'>
                        {`燃脂:${item.burn}`}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>

          <View className='home-detail-charts-view-title-bar'>
            <Image src={ic_comment} className='home-detail-buy-icon'/>
            <Text className='home-detail-status-txt'>{`用户评价(${commentList.length})`}</Text>
          </View>

          <View className='home-detail-charts-view'>
            {
              commentList.map((item, index) => {
                return (
                  <View key={`${index}`} className='home-detail-comment-item'>
                    <View className='home-detail-comment-content'>
                      <Image src={item.avatar} className='home-detail-comment-avatar'/>
                      <View className='home-detail-comment-title'>
                        <Text className='home-detail-comment-name-txt'>{item.name}</Text>
                        <Text className='home-detail-comment-date-txt'>{item.date}</Text>
                      </View>
                      <Text className='home-detail-comment-start'>{commentStart[item.start]}</Text>
                    </View>

                    <View className='home-detail-comment-content'>
                      <View className='home-detail-comment-block'>
                        <Text className='home-detail-comment-desc-txt'>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>

        </ScrollView>
        <View className='home-detail-appoint-btn-view'>
          <View className='home-detail-appoint-btn' onClick={this.onAppoint}>
            {
              !!appoint ?
                <AtIcon value='heart-2' size='18' color='#F9564F'/>
                : <AtIcon value='heart' size='18' color='#CCC'/>
            }
            <Text className='home-detail-appoint-btn-txt'>{`${!!appoint ? '已预约' : '预约'}`}</Text>
          </View>

          <View className='home-detail-appoint-btn' onClick={this.onCollect}>
            {
              !!collect ?
                <AtIcon value='star-2' size='18' color='#FECD1A'/>
                : <AtIcon value='star' size='18' color='#CCC'/>
            }
            <Text className='home-detail-appoint-btn-txt'>{`${!!collect ? '已收藏' : '收藏'}`}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail
