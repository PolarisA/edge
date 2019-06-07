/**
 * @Author : HuiWen
 * @Date : 2019-05-25
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  ScrollView,
} from '@tarojs/components'
import { AtCalendar } from 'taro-ui'

import './style.scss'
import { pType } from "../../../constants/config"
import PieChart from "../../../components/PieChart"
import { setMockData, uniqueByKey } from '../../../utils/index'
import '../../../constants/global'

class Detail extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      point: [],
      dateStr: [],
      overdue: [],
      unfinished: [],
      base: '',
      type: 0,
      date: (new Date()).Format('yyyyMMdd'),
      value: 0,
    }
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  _showToast = (msg) => {
    Taro.showToast({ icon: 'none', title: `${msg}%` })
  }

  componentDidMount() {
    const { ...params } = this.$router.params
    this.initData(params)

  }

  async initData(params) {
    await this._showLoading(true)
    const { type, base } = params
    let point = []

    switch (type * 1) {
      case pType.RESERVATION:
        point = await setMockData(parseInt(Math.random() * 120), 'CALENDAR')
        this.initDate(point)
        break

      case pType.DEFINE_MUTEX:
        point = await setMockData(parseInt(Math.random() * 150), 'DEFINE_MUTEX')
        this.initMutex(point)
        break

      default:
        break
    }

    this.setState({
      base,
      point,
      type: type * 1,
    })

    await this._showLoading(false)
  }

  initMutex = (point) => {
    console.log('=== initMutex point >>> ', point)
    let a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0;
    let _item = {}
    let pieData = []
    point.map((item) => {
      switch (item.point) {
        case 0:
          _item = {
            value: a++,
            name: item.desc
          }
          break
        case 2:
          _item = {
            value: b++,
            name: item.desc
          }
          break
        case 3:
          _item = {
            value: c++,
            name: item.desc
          }
          break
        case 4:
          _item = {
            value: d++,
            name: item.desc
          }
          break
        case 5:
          _item = {
            value: e++,
            name: item.desc
          }
          break
        case 6:
          _item = {
            value: f++,
            name: item.desc
          }
          break
        case 7:
          _item = {
            value: g++,
            name: item.desc
          }
          break
        case 8:
          _item = {
            value: h++,
            name: item.desc
          }
          break
        case 9:
          _item = {
            value: i++,
            name: item.desc
          }
          break
        case 10:
          _item = {
            value: j++,
            name: item.desc
          }
          break
        case 11:
          _item = {
            value: k++,
            name: item.desc
          }
          break
        case 12:
          _item = {
            value: l++,
            name: item.desc
          }
          break
        case 13:
          _item = {
            value: m++,
            name: item.desc
          }
          break
        case 14:
          _item = {
            value: n++,
            name: item.desc
          }
          break
        case 15:
          _item = {
            value: o++,
            name: item.desc
          }
          break
        default:
          break
      }
      pieData.push(_item)
    })

    let rePieData = pieData.reverse()
    let reInstallArray = uniqueByKey(rePieData, 'name')

    this.pieChart.refresh(reInstallArray)
  }

  initDate = (point) => {
    const { date } = this.state
    let dateArray = []
    let dateStr = []
    let overdue = []
    let unfinished = []

    point.map((item) => {
      let _date = (item.value).split('/').join('')
      dateArray.push(_date)
    })

    if (dateArray.length !== 0) {
      dateStr = dateArray.sort((a, b) => {
        return a - b
      })
    }

    if (dateStr.length !== 0) {
      dateStr.map((item) => {
        if (item < date) {
          const props = {
            status: 'NO',
            value: item,
          }
          overdue.push(props)
        } else {
          const props = {
            status: 'OFF',
            value: item,
          }
          unfinished.push(props)
        }
      })
    }

    this.setState({
      dateStr,
      overdue,
      unfinished,
    })
  }

  setDateInstall(value) {
    let pointObj = { status: 'NO', value: 0 }
    const { overdue, unfinished } = this.state
    const _point = overdue.concat(unfinished)

    _point.map((item, index) => {
      if (value === item.value) {
        pointObj.status = item.status
        pointObj.value = index
      }
      return pointObj
    })

    return pointObj
  }

  onDayClick = (date) => {
    const { point } = this.state
    let _date = date.value.split('-').join('')
    const { status, value } = this.setDateInstall(_date)

    let content = status === 'NO' ? `已完成课程：${point[value].desc}` : `有预约课程：${point[value].desc}`
    value !== 0 && Taro.showModal({
      title: '课程提醒',
      content,
    }).then(res => console.log(res.confirm, res.cancel))
  }

  onLeftClick = () => {
    const { point, overdue } = this.state
    let proportions = (100 * (overdue.length) / point.length).toFixed(2)
    this._showToast(proportions)
  }

  onRightClick = () => {
    const { point, unfinished } = this.state
    let proportions = (100 * (unfinished.length / point.length)).toFixed(2)
    this._showToast(proportions)
  }

  refPieChart = (node) => this.pieChart = node

  render() {
    const { point, overdue, unfinished } = this.state
    const { ...params } = this.$router.params
    let pageType = params.type * 1 === pType.RESERVATION
    let pieType = params.type * 1 === pType.DEFINE_MUTEX

    let _overdue = overdue.length
    let _unfinished = unfinished.length
    let total = _overdue + _unfinished

    return (
      <View className='profile-message'>
        <ScrollView
          className='message-scrollView'
          scrollY={true}
          scrollWithAnimation
          scrollTop={0}
          lowerThreshold={20}
          upperThreshold={20}>

          {pageType ? <View>
            <View className='detail-calendar-row-bar'>
              <View style={{ width: `${94 * _overdue / total}vw`, height: '5PX', backgroundColor: '#FFC01E' }}
                    onClick={this.onLeftClick}/>
              <View style={{ width: `${94 * _unfinished / total}vw`, height: '5PX', backgroundColor: '#277AB8' }}
                    onClick={this.onRightClick}/>
            </View>

            <View className='detail-calendar-desc-bar'>
              <View className='detail-calendar-column-part'>
                <Text className='detail-calendar-column-txt'>
                  {`已完成 ${overdue.length}`}
                </Text>
              </View>
              <View className='detail-calendar-column-part'>
                <Text className='detail-calendar-column-txt'>
                  {`在预约 ${unfinished.length}`}
                </Text>
              </View>
            </View>
          </View> : pieType ? <PieChart ref={this.refPieChart}/> : null}

          <View className='detail-calendar-line'/>
          <AtCalendar
            marks={point}
            minDate="2018/1/1"
            maxDate="2020/12/31"
            onDayClick={this.onDayClick}
          />

          {pieType ? <View className='detail-calendar-bottom'/> : null}
        </ScrollView>
      </View>
    )
  }
}

export default Detail

// <View className='detail-calender-head-bar'>
//   <View className='detail-calendar-head-part'>
//   <View style={{ width: '120PX', height: `${overdue.length * 2}PX`, backgroundColor: '#E3E3E3' }}/>
// </View>
//
// <View className='detail-calendar-head-part'>
//   <View style={{ width: '120PX', height: `${unfinished.length * 2}PX`, backgroundColor: '#D3D3D3' }}/>
// </View>
// </View>
