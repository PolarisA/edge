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

class Course extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("=== Course props -=-> ", this.props)

    return (
      <View className='course-page'>
        <AtCalendar minDate="2018/1/1" maxDate="2020/12/31"/>

        <View>
          
        </View>
      </View>
    )
  }
}

export default Course
