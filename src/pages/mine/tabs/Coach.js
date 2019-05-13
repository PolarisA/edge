/**
 * @Author : HuiWen
 * @Date : 2019-05-10
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
} from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.styles.scss'

import ic_coach_one from '../../../images/mine/ic_coach_boy2.png'
import ic_coach_two from '../../../images/mine/ic_coach_grils.png'
import ic_coach_three from '../../../images/mine/ic_coach_boy1.png'


const coachList = [
  {
    id: 400101,
    name: '张雄兵',
    avatar: ic_coach_one,
    skill: ['拳击', '自由搏击', '心肌训练'],
    price: '150/节',
    birth: '解放军部队',
    score: '98'
  },
  {
    id: 400102,
    name: 'AliceLina',
    avatar: ic_coach_two,
    skill: ['LesMills', '燃脂', '瑜伽'],
    price: '120/节',
    birth: '北京体美工作室',
    score: '96'
  },
  {
    id: 400103,
    name: 'Eleven',
    avatar: ic_coach_three,
    skill: ['体能', '燃脂', '矫正训练'],
    price: '100/节',
    birth: '北京体育大学',
    score: '90'
  },
]

class Coach extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("=== Coach props -=-> ", this.props)

    return (
      <View className='tabs-page'>
        {
          coachList.map((item, index) => {
            return (
              <View key={`${index}`} className='coach-item-box'>
                <View className='coach-item-avatar-view'>
                  <Image src={item.avatar} className='coach-item-avatar'/>
                  <Text className='coach-item-name-txt'>{item.name}</Text>
                </View>

                <View className='coach-item-content'>
                  <View className='coach-item-content-skill'>
                    <AtIcon value='bookmark' size='18' color='#ccc' className='coach-item-at-icon'/>
                    {
                      item.skill.map((cItem, index) => {
                        return (
                          <View key={`${index}`} className='coach-item-skill-tab'>
                            <Text className='coach-item-skill-tab-txt'>
                              {cItem}
                            </Text>
                          </View>
                        )
                      })
                    }
                  </View>

                  <View className='coach-item-content-desc'>
                    <AtIcon value='tags' size='18' color='#ccc' className='coach-item-at-icon'/>
                    <Text className='coach-item-content-txt'>
                      {item.birth}
                    </Text>

                    <AtIcon value='money' size='18' color='#ccc' className='coach-item-at-money'/>
                    <Text className='coach-item-content-txt'>
                      {item.price}
                    </Text>
                  </View>
                </View>

                <Text className='coach-item-score-txt'>
                  {item.score}
                  <Text className='coach-item-score-tips'>
                    {'评分'}
                  </Text>
                </Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default Coach
