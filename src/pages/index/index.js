import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  Swiper,
  ScrollView,
  SwiperItem
} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import { delay, isEmpty, isEmptyObject } from '../../utils'


import ic_house from '../../images/item/home.png'
import ic_sport from '../../images/item/sport.png'
import ic_write from '../../images/item/write.png'
import ic_location from '../../images/item/location.png'
import ic_device from '../../images/item/device.png'
import ic_price from '../../images/item/price.png'

import './index.scss'

@connect(({ home }) => ({ home }))
class Index extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      placeInfo: [],
      bannerData: [],
      title: '',
      subjects: [],
      count: 0,
    }
  }

  componentDidMount() {
    this.initCloud()
  }

  async initCloud() {
    await this._showLoading(true)
    const db = wx.cloud.database()

    const [shopCollection, bannerCollection] =
      await Promise.all([
        db.collection('shop'),
        db.collection('banner')
      ])

    if (!shopCollection || !bannerCollection) {
      return
    }

    await bannerCollection.get({
      success: res => {
        console.log('**** success -=-->', res.data)
        let bannerData = res.data
        this.setState({
          bannerData
        })
      },
      fail: err => {
        console.log('**** fail err -=->', err)
      }
    })

    await shopCollection.get({
      success: res => {
        console.log('=== success -=-->', res.data)

        let placeInfo = res.data
        this.setState({
          placeInfo
        })
        this._showLoading(false)
      },
      fail: err => {
        this._showLoading(false)
        Taro.showToast({ title: '网络连接超时，请稍后再试' })
        console.log('=== fail -=-->', err)
      }
    })
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  onScroll = () => {

  }

  onItemClick(item) {
    console.log("=== item -=-->", item)
    const { _id, shopId } = item

    Taro.navigateTo({
      url: `/pages/index/detail/Detail?id=${_id}&shopId=${shopId}`
    })
  }

  renderColor(item) {
    let statusColor = `background-color:${item.typeColor}`
    return statusColor
  }

  render() {
    const { placeInfo, bannerData } = this.state
    console.log("=== home state -->", this.state)

    return (
      <View className='home-scroll'>
        <ScrollView
          className='home-scroll-view'
          scrollY={true}
          scrollWithAnimation
          scrollTop={0}
          style={{ height: '150px' }}
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
                  <SwiperItem key={`${index}`}>
                    <Image className='home-banner-item' src={item.img}/>
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
                <View key={`${index}`} className='home-place-item' onClick={() => this.onItemClick(item)}>
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
