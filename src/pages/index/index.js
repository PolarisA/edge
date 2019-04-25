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

import './index.scss'

const bannerData = [
  { banner: banner_girls, action: '', desc: '私人教练A', url: '' },
  { banner: banner_sea, action: '', desc: '扩胸课程', url: '' },
  { banner: banner_life, action: '', desc: '优惠活动', url: '' },
  { banner: banner_luowang, action: '', desc: '最近新店', url: '' },
]

const placeInfo = [
  { id: 1000, name: '成吉思汗大街店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1001, name: '财经大学(回民区)店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1002, name: '工业大学(新城区)店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1003, name: '内蒙古大学（赛罕区）店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1004, name: '将军衙署店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1005, name: '鼓楼店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1006, name: '青城公园店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1007, name: '伊利广场店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1008, name: '十四中店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1009, name: '万达广场店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1010, name: '海亮广场店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1011, name: '长乐宫店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1012, name: '学府康都店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1013, name: '嘉茂购物中心店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1014, name: '民族学院店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1015, name: '国贸店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
  { id: 1016, name: '体育场店', area: 60, deploy: ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪'], NumberNow: '18', appoint: '5', activity: '首次扫码,免费3次体验' },
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

  render() {
    console.log(">>> props -=-> ", this.props)
    const {
      title,
      subjects,
      count,
    } = this.state

    const scrollStyle = {
      height: '150px'
    }

    return (
      <View className='page-homepage'>
        {
          subjects.length ?
            subjects.map((item, index) => {
              // console.log("=== item -=--> ", item)
              return (
                <Feed
                  key={index + ''}
                  feed_source_img={item.images.medium}
                  feed_source_name={item.title}
                  feed_source_title={item.pubdates[0]}
                />
              )
            })
            :
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
        }
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
            {
              placeInfo.map((item, index) => {
                return (
                  <View key={index} className='home-place-item'>
                    <View className='home-place-item'>
                    </View>
                    <View>
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Index
