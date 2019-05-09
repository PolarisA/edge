import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Image,
  Button,
  Swiper,
  ScrollView,
  SwiperItem
} from '@tarojs/components'


import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import Feed from '../../components/feed/feed'
import { delay, isEmpty, isEmptyObject } from '../../utils'
import logo from '../../images/logo.png'
import banner_girls from '../../images/banner/grils.jpeg'
import banner_sea from '../../images/banner/ic_sea.jpeg'
import banner_life from '../../images/banner/life.jpeg'
import banner_luowang from '../../images/banner/luowang.jpeg'

import ic_house from '../../images/item/home.png'
import ic_area from '../../images/item/area.png'
import ic_sport from '../../images/item/sport.png'
import ic_write from '../../images/item/write.png'
import ic_location from '../../images/item/location.png'
import ic_device from '../../images/item/device.png'
import ic_price from '../../images/item/price.png'

import './index.scss'

const bannerData = [
  { banner: banner_girls, action: '', desc: '私人教练A', url: '' },
  { banner: banner_sea, action: '', desc: '扩胸课程', url: '' },
  { banner: banner_life, action: '', desc: '优惠活动', url: '' },
  { banner: banner_luowang, action: '', desc: '最近新店', url: '' },
]

const shopStatus = {
  OPENING: '正常营业',
  RESTING: '休息中',
  RENOVATE: '装修中',
  ENOUGH: '爆满',
}

const statusColor = {
  OPENING: '#02A348',
  RESTING: '#D3D4D9',
  RENOVATE: '#424C55',
  ENOUGH: '#F6511D',
}


const placeInfo = [
  { id: 1000, name: '成吉思汗大街店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验', status: shopStatus.ENOUGH, typeColor: statusColor.ENOUGH },
  { id: 1001, name: '财经大学(回民区)店', area: 45, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '7', appoint: '2', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1002, name: '工业大学(新城区)店', area: 52, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '23', appoint: '4', activity: '首次扫码,免费3次体验', status: shopStatus.RESTING, typeColor: statusColor.RESTING },
  { id: 1003, name: '内蒙古大学（赛罕区）店', area: 78, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '25', appoint: '7', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1004, name: '将军衙署店', area: 43, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '14', appoint: '0', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1005, name: '鼓楼店', area: 45, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '16', appoint: '1', activity: '首次扫码,免费3次体验', status: shopStatus.ENOUGH, typeColor: statusColor.ENOUGH },
  { id: 1006, name: '青城公园店', area: 36, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '24', appoint: '1', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1007, name: '伊利广场店', area: 65, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '30', appoint: '0', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1008, name: '十四中店', area: 72, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '16', appoint: '2', activity: '首次扫码,免费3次体验', status: shopStatus.RENOVATE, typeColor: statusColor.RENOVATE },
  { id: 1009, name: '万达广场店', area: 50, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '22', appoint: '5', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1010, name: '海亮广场店', area: 45, deploy: ['淋浴', '跑步机', '椭圆机', '陀螺仪'], NumberNow: '19', appoint: '3', activity: '首次扫码,免费3次体验', status: shopStatus.RESTING, typeColor: statusColor.RESTING },
  { id: 1011, name: '长乐宫店', area: 48, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '27', appoint: '5', activity: '首次扫码,免费3次体验', status: shopStatus.ENOUGH, typeColor: statusColor.ENOUGH },
  { id: 1012, name: '学府康都店', area: 75, deploy: ['淋浴', '跑步机', '扩胸机', '陀螺仪'], NumberNow: '30', appoint: '8', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1013, name: '嘉茂购物中心店', area: 60, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '13', appoint: '2', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1014, name: '民族学院店', area: 80, deploy: ['淋浴', '跑步机', '陀螺仪'], NumberNow: '40', appoint: '5', activity: '首次扫码,免费3次体验', status: shopStatus.RESTING, typeColor: statusColor.RESTING },
  { id: 1015, name: '国贸店', area: 55, deploy: ['跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '2', activity: '首次扫码,免费3次体验', status: shopStatus.OPENING, typeColor: statusColor.OPENING },
  { id: 1016, name: '体育场店', area: 90, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '45', appoint: '15', activity: '首次扫码,免费3次体验', status: shopStatus.RENOVATE, typeColor: statusColor.RENOVATE },
]

@connect(({ home }) => ({ home }))

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subjects: [],
      count: 0,
    }
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("=== nextProps -=-> ", nextProps)
    const { home } = nextProps

    if (home && !isEmptyObject(home)) {
      this._showLoading(home.loading)

      const {
        title,
        subjects,
        count,
      } = home

      this.setState({
        title,
        subjects,
        count,
      })
    }

  }

  onBtnClick = () => {
    const params = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '北京',
    }
    this.setState({
      loading: true,
    })

    dispatcher.home.loadList(params)
  }

  onScroll = () => {
    console.log("=== onScroll  ")
  }

  renderColor(item) {
    let statusColor = `background-color:${item.typeColor}`
    return statusColor
  }

  render() {
    const scrollStyle = {
      height: '150px'
    }

    return (
      <View className='home-scroll'>
        <ScrollView
          className='home-scroll-view'
          scrollY={true}
          scrollWithAnimation
          scrollTop={0}
          style={scrollStyle}
          lowerThreshold={20}
          upperThreshold={20}
          onScroll={this.onScroll}>
          <Swiper
            className='home-banner'
            indicatorColor='#dcd'
            indicatorActiveColor='#fff'
            vertical={false}
            circular={true}
            duration={2400}
            indicatorDots={true}
            autoplay={true}>
            {
              bannerData.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <Image className='home-banner-item' src={item.banner}/>
                    <View className='home-banner-content'>
                      <Text className='home-banner-title'>{item.desc}</Text>
                    </View>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          {
            placeInfo.map((item, index) => {
              return (
                <View key={`${index}`} className='home-place-item'>
                  <View className='home-place-item-top'>
                    <View className='home-place-item-top-left'>
                      <View className='home-place-item-top-title'>
                        <Image src={ic_house} className='home-item-icon'/>
                        <Text className='place-item-title-txt'>
                          {item.name}
                        </Text>
                        <View className='home-item-block'>
                          <Text className='place-item-content-txt'>
                            {item.area}m²
                          </Text>
                        </View>
                      </View>

                      <View className='home-place-item-top-title'>
                        <Image src={ic_sport} className='home-item-icon'/>
                        <Text className='place-item-number-txt'>
                          当前人数：<Text className='place-item-number-selected-txt'>{item.NumberNow}</Text>
                        </Text>

                        <Image src={ic_write} className='home-item-icon'/>
                        <Text className='place-item-number-txt'>
                          预约人数：<Text className='place-item-number-selected-txt'>{item.appoint}</Text>
                        </Text>
                      </View>
                    </View>

                    <View className='home-place-item-top-right'>
                      <Image src={ic_location} className='home-item-icon'/>
                      <Text className='place-item-number-txt'>
                        位置
                      </Text>
                    </View>
                  </View>

                  <View className='home-place-item-bottom'>
                    <View className='home-place-item-bottom-content'>
                      <Image src={ic_device} className='home-item-icon'/>
                      {
                        item.deploy.map((cItem, index) => {
                          return (
                            <View key={`${index}`} className='home-place-item-device'>
                              <Text className='place-item-content-txt'>
                                {cItem}
                              </Text>
                            </View>
                          )
                        })
                      }
                    </View>

                    <View className='home-place-item-bottom-activity'>
                      <View className='place-item-price-view'>
                        <Image src={ic_price} className='home-item-icon'/>
                        <Text className='place-item-number-txt'>
                          {item.activity}
                        </Text>
                      </View>

                      <View className='home-place-item-status' style={this.renderColor(item)}>
                        <Text className='place-item-content-txt'>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default Index
