/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Map,
} from '@tarojs/components'

import './index.scss'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import { localPoint, localArea } from '../../constants/config'

import ic_mark from '../../images/map/ic_location.png'

function calloutShow(name, present, appointment) {
  let content = `${name}\n 当前:${present} 预约:${appointment}`

  const callout = {
    content,
    color: '#0068C4',
    fontSize: 15,
    padding: 5,
    borderRadius: 2,
    textAlign: 'center',
    display: 'ALWAYS',
  }

  return callout
}

function setMarkers(id, index, name, present, appointment, latitude, longitude) {
  const markers = {
    id,
    iconPath: ic_mark,
    name,
    latitude,
    longitude,
    width: 30,
    height: 30,
    zIndex: 10,
    callout: calloutShow(name, present, appointment)
  }

  return markers
}

function setCenter(id, latitude, longitude) {
  const markers = {
    id,
    name: '我的位置',
    iconPath: ic_mark,
    latitude,
    longitude,
    width: 30,
    height: 30,
    zIndex: 10,
    callout: {
      content: '我的位置',
      color: '#0068C4',
      fontSize: 15,
      padding: 5,
      borderRadius: 2,
      textAlign: 'center',
      display: 'ALWAYS',
    }
  }
  return markers
}

@connect(({ discover }) => ({ discover }))
class Subscribe extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor() {
    super()
    this.state = {
      center: {
        latitude: 40.8443,
        longitude: 111.7077,
      },
      loading: false,
      markers: [],
      localPoint,
    }
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  componentDidMount() {
    const mapCtx = Taro.createMapContext('myMap')
    this.initMap()
  }

  async initMap() {
    await this._showLoading(true)

    const db = wx.cloud.database()

    const mapCollection = await db.collection('shop')
    if (!mapCollection) return

    await mapCollection.get({
      success: res => {
        console.log('== mapCollection res >>>', res)
        const markers = []

        res.data.map((item, index) => {
          const marker = {
            ...setMarkers(
              item._id,
              index,
              item.name,
              item.NumberNow * 1,
              item.appoint * 1,
              item.latitude,
              item.longitude,
            )
          }
          markers.push(marker)
        })
        this.setState({
          markers,
        })
      },
      fail: err => {
        console.log('== mapCollection err >>>', err)
      }
    })

    await this._showLoading(false)

    // await Taro.getLocation({
    //   type: 'gcj02',
    //   altitude: true,
    //   success: (res) => {
    //     console.log("=== success res === ", res)
    //     this.setLocationCenter(res)
    //
    //     let markers = [...mMarkers, { ...setCenter(1000, res.latitude, res.longitude) }]
    //     let localPoint = [...mLocalPoint, { latitude: res.latitude, longitude: res.longitude }]
    //
    //     this.state.markers = []
    //     this.state.localPoint = []
    //
    //     this.setState({
    //       markers,
    //       localPoint
    //     })
    //   },
    //   fail: (res) => {
    //     console.log("=== success res === ", res)
    //   }
    // }).then(res => {
    //   console.log("=== get location res === ", res)
    // })
  }

  setLocationCenter = (res) => {
    const { latitude, longitude } = res
    const center = {
      latitude,
      longitude,
    }
    this.setState({
      center,
    })
  }

  calloutTap(callout) {
    const { markerId } = callout

    Taro.navigateTo({
      url: `/pages/index/detail/Detail?id=${markerId}`
    })
  }

  render() {
    console.log("=== discover props >> ", this.props)
    console.log("=== discover state >> ", this.state)
    const {
      center: {
        longitude,
        latitude
      },
      markers,
      localPoint,
    } = this.state

    return (
      <View className='discover-page'>
        <Map
          id={'myMap'}
          className='map-page'
          longitude={longitude}
          latitude={latitude}
          scale={13}
          markers={markers}
          include-points={localPoint}
          show-compass
          enable-zoom
          onCalloutTap={this.calloutTap}
          show-location>
        </Map>
      </View>
    )
  }
}

export default Subscribe
