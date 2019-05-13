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
  Map,
  Button
} from '@tarojs/components'

import './index.scss'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ic_mark from '../../images/map/ic_mark.png'

const markers = [
  { id: 1001, iconPath: ic_mark, name: '财经大学(回民区)店', latitude: 40.8536, longitude: 111.6343, width: 50, height: 50 },
  { id: 1002, iconPath: ic_mark, name: '成吉思汗大街店', latitude: 40.8538, longitude: 116.6506, width: 50, height: 50 },
  { id: 1003, iconPath: ic_mark, name: '工业大学(新城区)店', latitude: 40.8462, longitude: 111.6800, width: 50, height: 50 },
  { id: 1004, iconPath: ic_mark, name: '青城公园店', latitude: 40.8081, longitude: 111.6644, width: 50, height: 50 },
  { id: 1005, iconPath: ic_mark, name: '伊利广场店', latitude: 40.8093, longitude: 111.6541, width: 50, height: 50 },
  { id: 1006, iconPath: ic_mark, name: '万达广场店', latitude: 40.8329, longitude: 111.7345, width: 50, height: 50 },
  { id: 1007, iconPath: ic_mark, name: '海亮广场店', latitude: 40.8147, longitude: 111.6697, width: 50, height: 50 },
  { id: 1008, iconPath: ic_mark, name: '内蒙古大学（赛罕区）店', latitude: 40.8126, longitude: 111.6902, width: 50, height: 50 },
]

@connect(({ discover }) => ({ discover }))
class Subscribe extends Component {
  config = {
    navigationBarTitleText: ''
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
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        console.log("=== success res === ", res)
        this.setLocationCenter(res)
      },
      fail: (res) => {
        console.log("=== fail res === ", res)
      }
    }).then(res => {
      console.log("=== get location res === ", res)
    })
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

  onSearch = () => {
    console.log("=== onSearch ")

  }

  getInput = (changed) => {
    // console.log("=== getInput changed -=-> ", changed)
    const {
      detail: { value }
    } = changed

    console.log("=== value -=--> ", value)
  }


  render() {
    console.log("=== discover props >> ", this.props)
    console.log("=== discover state >> ", this.state)
    const { center: { longitude, latitude } } = this.state

    return (
      <View className='discover-page'>
        <View className='discover-search-block'>
          <Input
            type='text'
            placeholder='位置/健身房/站点'
            maxLength={30}
            className='discover-search-input'
            placeholderClass='discover-search-placeholder-input'
            onInput={(value) => this.getInput(value)}
          />

          <Button
            className='discover-search-btn'
            size='default'
            type='primary'
            style='background-color:#37c'
            onClick={this.onSearch}>
            <Text className='discover-search-btn-txt'>
              {'搜索'}
            </Text>
          </Button>
        </View>

        <Map
          className='map-page'
          longitude={longitude}
          latitude={latitude}
          scale={15}
        />

      </View>
    )
  }
}

export default Subscribe
