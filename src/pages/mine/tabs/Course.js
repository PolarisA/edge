/**
 * @Author : HuiWen
 * @Date : 2019-05-10
 * @Description :
 **/

import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
} from '@tarojs/components'

import {AtCalendar} from "taro-ui"
import './index.styles.scss'

const marks = [
  {value: '2019/04/21'},
  {value: '2019/04/23'},
  {value: '2019/04/25'},
  {value: '2019/04/27'},
  {value: '2019/05/01'},
  {value: '2019/05/05'},
  {value: '2019/05/08'},
]

class Course extends Component {
  config = {
    navigationBarTitleText: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      plan: false
    }
  }

  render() {
    const {plan} = this.state
    console.log("=== Course props -=-> ", this.props)

    return (
      <View className='course-page'>
        <AtCalendar
          marks={marks}
          minDate="2018/1/1"
          maxDate="2020/12/31"
        />

        <View className='course-page-prompt'>
          <Text className='course-page-content-txt'>
            {
              plan ?
                <Text className='course-page-content-plan-txt'>
                  {'点击查看今日课程详情'}
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
