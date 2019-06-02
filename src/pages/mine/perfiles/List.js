/**
 * @Author : HuiWen
 * @Date : 2019-05-25
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
import {AtIcon} from 'taro-ui'

import './style.scss'

class List extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {...params} = this.$router.params
    console.log('=== params -=-->', params)
  }


  render() {
    console.log("=== List props -=-> ", this.props)

    return (
      <View className='profile-page'>
        <Text>
          {'List'}
        </Text>
      </View>
    )
  }
}

export default List
