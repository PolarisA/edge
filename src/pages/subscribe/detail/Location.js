/**
 * @Author : HuiWen
 * @Date : 2019-06-04
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Map,
} from '@tarojs/components'

import './style.scss'

import ic_mark from '../../../images/map/ic_location.png'

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

class Location extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      info: {},
      markers: []
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
    const { ...params } = this.$router.params
    this.initData(params)
  }

  async initData(params) {
    await this._showLoading(true)
    const { id } = params
    const db = wx.cloud.database()

    await db.collection('shop')
      .doc(`${id}`)
      .get()
      .then(res => {
        const markers = []
        const info = res.data

        const { shopId, name, NumberNow, appoint, latitude, longitude } = info
        const marker = {
          ...setMarkers(shopId, 0, name, NumberNow, appoint, latitude, longitude)
        }
        markers.push(marker)

        this.setState({
          info,
          markers,
        })
        Taro.setNavigationBarTitle({ title: info.name })
      })

    await this._showLoading(false)
  }

  render() {
    const { info, markers } = this.state

    return (
      <View className='location-page'>
        <Map
          id={'locationMap'}
          className='location-map-page'
          longitude={info && info.longitude}
          latitude={info && info.latitude}
          scale={16}
          markers={markers}
          show-compass
          enable-zoom
          show-location>
        </Map>
      </View>
    )
  }
}

export default Location
