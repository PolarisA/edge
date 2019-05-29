/**
 * @Author : HuiWen
 * @Date : 2019-05-25
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
} from '@tarojs/components'
import { AtIcon, AtCalendar } from 'taro-ui'

import './style.scss'
import { pType } from "../../../constants/config";
import { setMockData } from '../../../utils/index'
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
    console.log("=== params -=--> ", params)
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
        this.initDate(point)
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


  onDayClick = (date) => {
    console.log("=== onDayClick date -=--> ", date)

  }


  render() {
    const { point } = this.state
    console.log("=== Detail state -=-> ", this.state)

    return (
      <View className='detail-calendar-page'>
        <View className='detail-head-line'/>
        <AtCalendar
          marks={point}
          minDate="2018/1/1"
          maxDate="2020/12/31"
          onDayClick={this.onDayClick}
        />
      </View>
    )
  }
}

export default Detail
