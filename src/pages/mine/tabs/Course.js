/**
 * @Author : HuiWen
 * @Date : 2019-05-10
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'

import { AtCalendar } from "taro-ui"
import '../../../constants/global'
import './index.styles.scss'
import { setMockData } from "../../../utils";

class Course extends Component {
  config = {
    navigationBarTitleText: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      plan: [],
      isPlan: false,
      sequence: 0,
      date: (new Date()).Format('yyyy/MM/dd'),
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
    this.initMockData()
  }

  async initMockData() {
    const { date } = this.state
    await this._showLoading(true)
    let plan = await setMockData(parseInt(Math.random() * 125) + 1, 'CALENDAR')

    let isPlan = false
    await plan.map((item, index) => {
      if (date === item.value) {
        return isPlan = true
      }
    })

    await this._showLoading(false)
    this.setState({ plan, isPlan })
  }

  setContrast(date) {
    let planObj = { isPlan: false, sequence: 0 }
    const { plan } = this.state
    for (let i = 0; i < plan.length; i++) {
      if (date === plan[i].value) {
        planObj.isPlan = true
        planObj.sequence = i
        return planObj
      }
    }
    return planObj
  }

  onDayClick = (date) => {
    let _date = date.value.split('-').join('/')
    const { isPlan, sequence } = this.setContrast(_date)
    this.setState({
      isPlan,
      sequence
    })
    console.log("### onDayClick isPlan -=-> ", isPlan)

    !!isPlan ? Taro.showModal({
      title: '课程提醒',
      content: '有预约课程,请注意行程安排',
    }).then(res => console.log(res.confirm, res.cancel)) : null
  }


  render() {
    const { plan, isPlan, sequence } = this.state

    return (
      <View className='course-page'>
        <View className='course-head-line'/>
        <AtCalendar
          marks={plan}
          minDate="2018/1/1"
          maxDate="2020/12/31"
          onDayClick={this.onDayClick}
        />

        <View className='course-page-prompt'>
          <Text className='course-page-content-txt'>
            {
              isPlan ?
                <Text className='course-page-content-plan-txt'>
                  {`${plan[sequence].desc}`}
                </Text>
                : '今日无课程安排'
            }
          </Text>
        </View>
      </View>
    )
  }
}

export default Course
