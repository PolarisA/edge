/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import Taro, {Component} from '@tarojs/taro'
import {View, Input, Text, Map} from '@tarojs/components'

import './index.scss'
import {connect} from '@tarojs/redux'
import {dispatcher} from '@opcjs/zoro'

@connect(({discover}) => ({discover}))
class Subscribe extends Component {
  config = {
    navigationBarTitleText: '订阅'
  }

  constructor() {
    super()
    this.state = {
      center: {
        latitude: 0,
        longitude: 0,
      },
      loading: false
    }
  }

  componentDidMount() {
    Taro.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      success: function (res) {
        console.log("=== location success ===", res)
      },
      fail: function () {
        console.log("=== location fail ===")
      }
    }).then(res => {
      this.setLocation(res)
    })
  }

  async setLocation(res) {
    const {latitude, longitude} = res
    console.log("=== setLocation res -=-> ", res)
    const center = {
      latitude,
      longitude,
    }

    this.setState({
      center,
    })
  }

  render() {
    console.log("=== discover props >> ", this.props)
    console.log("=== discover state >> ", this.sa)


    return (
      <View className='discover-page'>
        <Map
          className='map-page'
          longitude={116.480913}
          latitude={39.996717}
          scale={15}
        />

      </View>
    )
  }
}

export default Subscribe
