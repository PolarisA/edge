import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
  ScrollView,
} from '@tarojs/components'

import './style.scss'

const reward = [
  {date: '2019-05-12', formId: 'xxxxxx', desc: 'XXXX', price: 50, type: '邀请'},
  {date: '2019-05-12', formId: 'xxxxxx', desc: 'XXXX', price: 50, type: '邀请'},
  {date: '2019-05-12', formId: 'xxxxxx', desc: 'XXXX', price: 50, type: '邀请'},
  {date: '2019-05-12', formId: 'xxxxxx', desc: 'XXXX', price: 50, type: '邀请'},
]

class Invitation extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      reward,
    }
  }

  render() {
    console.log("==== Invitation props >>>> ", this.props)
    return (
      <View className='profile-invitation'>
        <View className='invitation-head-view'>
          <View className='invitation-head-view-part'>
            <Text className='invitation-head-txt'>
              <Text style={{fontSize: '25pt', marginTop: -10}}>{'{ '}</Text>
              {'156'}
              <Text style={{fontSize: '25pt', marginTop: -10}}>{' }'}</Text>
            </Text>
            <Text className='invitation-head-tips'>{'奖励金额'}</Text>
          </View>
          <View className='invitation-head-line'/>
          <View className='invitation-head-view-part'>
            <Text className='invitation-head-txt'>
              <Text style={{fontSize: '25pt', marginTop: -10}}>{'{ '}</Text>
              {'134'}
              <Text style={{fontSize: '25pt', marginTop: -10}}>{' }'}</Text>
            </Text>
            <Text className='invitation-head-tips'>{'获得积分'}</Text>
          </View>
        </View>

        <Text className='invitation-head-tips'>
          profile-invitation
        </Text>
      </View>
    )
  }
}

export default Invitation
