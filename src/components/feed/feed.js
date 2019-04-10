import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './feed.scss'

class Feed extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View className='feed-item'>
        <View className='feed-source'>
          <View className='avatar flex1'>
            <Image src={this.props.feed_source_img}/>
          </View>
          <View className='flex8'>
            <Text className='feed-source-txt'>{this.props.feed_source_name}</Text>
          </View>

        </View>

        <View className='feed-content'>
          <View className='follow-it'>
            <Text className='feed-source-txt'>{this.props.feed_source_name}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Feed
