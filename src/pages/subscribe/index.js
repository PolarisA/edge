/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  CoverView,
  CoverImage,
  Input,
  Text,
  Map,
  Button
} from '@tarojs/components'

import './index.scss'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ic_mark from '../../images/map/ic_location.png'
import ic_qrCode from '../../images/map/ic_visualization.png'

const localPoint = [
  {
    latitude: 40.8536,
    longitude: 111.6343,
  },
  {
    latitude: 40.8538,
    longitude: 111.6506,
  },
  {
    latitude: 40.8462,
    longitude: 111.6800,
  },
  {
    latitude: 40.8081,
    longitude: 111.6644,
  },
  {
    latitude: 40.8093,
    longitude: 111.6541,
  },
  {
    latitude: 40.8329,
    longitude: 111.7345,
  },
  {
    latitude: 40.8147,
    longitude: 111.6697,
  },
  {
    latitude: 40.8126,
    longitude: 111.6902,
  }
]

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

function setMarkers(id, index, name, present, appointment) {
  const markers = {
    id,
    iconPath: ic_mark,
    name,
    ...localPoint[index],
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

const markers = [
  { ...setMarkers(1001, 0, '财经大学(回民区)店', 8, 2) },
  { ...setMarkers(1002, 1, '成吉思汗大街店', 15, 3) },
  { ...setMarkers(1003, 2, '工业大学(新城区)店', 7, 0) },
  { ...setMarkers(1004, 3, '青城公园店', 5, 2) },
  { ...setMarkers(1005, 4, '伊利广场店', 4, 0) },
  { ...setMarkers(1006, 5, '万达广场店', 11, 3) },
  { ...setMarkers(1007, 6, '海亮广场店', 15, 4) },
  { ...setMarkers(1008, 7, '内蒙古大学（赛罕区）店', 6, 1) },
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
        latitude: 40.8443,
        longitude: 111.7077,
      },
      loading: false,
      markers,
      localPoint,
    }
  }

  componentDidMount() {
    const mapCtx = Taro.createMapContext('myMap')
    this.initMap()
  }

  async initMap() {
    const mMarkers = this.state.markers
    const mLocalPoint = this.state.localPoint

    await Taro.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        console.log("=== success res === ", res)
        this.setLocationCenter(res)

        let markers = [...mMarkers, { ...setCenter(1000, res.latitude, res.longitude) }]
        let localPoint = [...mLocalPoint, { latitude: res.latitude, longitude: res.longitude }]

        this.state.markers = []
        this.state.localPoint = []

        this.setState({
          markers,
          localPoint
        })
      },
      fail: (res) => {
        console.log("=== success res === ", res)
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

  onMarkerClick(marker) {
    console.log("=== onMarkerClick marker -=-> ", marker)

  }

  onShowModal = () => {
    Taro.showModal({
      title: '会员二维码',
      content: 'XXXX',
    }).then(res => console.log(res.confirm, res.cancel))
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
          show-location>
        </Map>
      </View>
    )
  }
}

export default Subscribe

// <CoverView className='discover-map-cover-bar' onClick={this.onShowModal}>
//   <CoverImage src={ic_qrCode} className='discover-map-cover-qrCode'/>
//   </CoverView>
