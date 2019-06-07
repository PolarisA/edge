/**
 * @Author : HuiWen
 * @Date : 2019-05-10
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
} from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.styles.scss'

const coachList = [
  {
    id: 400101,
    name: '张雄兵',
    avatar: 'https://7163-qcitycloud-cffa3a-1258938492.tcb.qcloud.la/coach/ic_coach_boy2.png?sign=a5fa59ac2acdb8cea60fb7cc833804cc&t=1559047451',
    skill: ['拳击', '自由搏击', '心肌训练'],
    price: '150/节',
    birth: '解放军部队',
    score: '98'
  },
  {
    id: 400102,
    name: 'AliceLina',
    avatar: 'https://7163-qcitycloud-cffa3a-1258938492.tcb.qcloud.la/coach/ic_coach_grils.png?sign=c34c943f02af13c7e8a2f341943fa40e&t=1559047462',
    skill: ['LesMills', '燃脂', '瑜伽'],
    price: '120/节',
    birth: '北京体美工作室',
    score: '96'
  },
  {
    id: 400103,
    name: 'Eleven',
    avatar: 'https://7163-qcitycloud-cffa3a-1258938492.tcb.qcloud.la/coach/ic_coach_boy1.png?sign=2a68859b25d963f1062ed91fc91604ef&t=1559047386',
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
