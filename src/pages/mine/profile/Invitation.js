import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'

import './style.scss'
import '../../../constants/global'
import {setMockData} from "../../../utils";

class Invitation extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      reward: [],
      date: (new Date()).Format('yyyy-MM-dd'),
    }
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({title: '加载中'})
    } else {
      Taro.hideLoading()
    }
  }

  componentDidMount() {
    this.initMockData()
  }

  async initMockData() {
    await this._showLoading(true)
    const _date = this.state.date
    let today = _date.split('-').join('')
    console.log("=== today >>> ",today)

    let _reward = await setMockData(parseInt(Math.random() * 15) + 1, 'REWARD')

    if (!_reward) return

    let reward = await _reward.filter((res) => {
      console.log("=== res ==> ",res)

      const markDay = (res.date).split('/').join('')
      console.log("=== markDay ==> ",markDay)
      return markDay <= today
    })

    console.log("=== reward ==> ",reward)
    await this._showLoading(false)
    this.setState({
      reward,
    })
  }

  render() {
    console.log("==== Invitation state >>>> ", this.state)
    const {reward} = this.state
    return (
      <View className='profile-invitation'>
        <View className='invitation-head-view'>
          <View className='invitation-head-view-part'>
            <Text className='invitation-head-txt'>
              {'156'}
            </Text>
            <Text className='invitation-head-tips'>{'奖励金额'}</Text>
          </View>
          <View className='invitation-head-line'/>
          <View className='invitation-head-view-part'>
            <Text className='invitation-head-txt'>
              {'134'}
            </Text>
            <Text className='invitation-head-tips'>{'获得积分'}</Text>
          </View>
        </View>

        <View className='invitation-title-bar'>
          <Text className='invitation-title-txt'>
            {'邀请记录'}
          </Text>
        </View>

        {
          reward.map((item, index) => {
            return (
              <View key={`${index}`} className='invitation-item-view'>
                <Text className='invitation-item-title-txt'>
                  {item.date}
                </Text>

                <View className='invitation-item-card-small-view'>
                  <Text className='invitation-item-title-txt'>
                    {`ID:${item.formId}`}
                  </Text>
                </View>

                <View className='invitation-item-card-small-view'>
                  <Text className='invitation-item-title-txt'>
                    奖励: ￥<Text className='invitation-item-price-txt'>{item.price}</Text>
                  </Text>
                </View>

                <View className='invitation-item-card-view'>
                  <Text className='invitation-item-title-txt'>
                    {`来源:${item.type}`}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default Invitation
