/**
 * @Author : HuiWen
 * @Date : 2019-05-25
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

import { pType, localArea } from '../../../constants/config'
import { setMockData } from '../../../utils/index'
import PieChart from "../../../components/PieChart"

import ic_runner from '../../../images/home/ic_runner.png'
import ic_active from '../../../images/home/ic_active.png'
import ic_places from '../../../images/home/ic_places.png'

import './style.scss'

const chartData = [
  { value: (Math.random() * 300) + 50, name: '拉伸' },
  { value: (Math.random() * 260) + 40, name: '扩胸' },
  { value: (Math.random() * 180) + 35, name: '握举' },
  { value: (Math.random() * 80) + 45, name: '力量' },
  { value: (Math.random() * 850) + 50, name: '跑步' }
];

class List extends Component {
  config = {
    navigationBarTitleText: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      base: '',
      type: 0,
      list: [],
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
    this.initData(params)
  }

  async initData(params) {
    await this._showLoading(true)
    const { base, type } = params
    let _type = type * 1
    let list = []

    switch (_type) {
      case pType.SYSTEM_MESSAGE:
        list = await setMockData(parseInt(Math.random() * 15) + 1, 'MESSAGE')
        break
      case pType.EXERCISES:
        list = await setMockData(parseInt(Math.random() * 20) + 1, 'EXERCISES')
        await this.pieChart.refresh(chartData)
        break

      default:
        break
    }

    await this._showLoading(false)
    this.setState({
      base,
      list,
      type: _type,
    })
  }

  refPieChart = (node) => this.pieChart = node

  render() {
    const { list } = this.state
    const { ...params } = this.$router.params
    let pageType = params.type * 1 === pType.SYSTEM_MESSAGE

    console.log("=== List props -=-> ", this.props)
    console.log("=== List state -=-> ", this.state)

    return (
      <View className='profile-message'>
        <ScrollView
          className='message-scrollView'
          scrollY={true}
          scrollWithAnimation
          scrollTop={0}
          lowerThreshold={20}
          upperThreshold={20}>
          {pageType ? null : <PieChart ref={this.refPieChart}/>}

          {
            list.map((item, index) => {
              return (
                <View key={`${index}`} className='message-card-content'>
                  <View className='message-card-time'>
                    <Text className='message-card-time-txt'>
                      {item.time}
                    </Text>
                  </View>

                  {
                    !!pageType
                      ?
                      <View className='message-card-content-view'>
                        <Text className='message-card-title-txt'>
                          {item.title}
                        </Text>

                        <Text className='message-card-content-txt'>
                          {item.content}
                        </Text>
                      </View>
                      :
                      <View className='message-card-content-view'>
                        <View className='running-content-item-title'>
                          <Image src={ic_runner} className='running-time-icon'/>
                          <Text className='running-item-title-txt'>
                            {`总耗时: ${item.running}`}
                          </Text>

                          <View className='running-content-item-burn'>
                            <Image src={ic_active} className='running-time-icon'/>
                            <Text className='running-item-burn-txt'>
                              {`燃脂量: ${item.burn} 大卡`}
                            </Text>
                          </View>
                        </View>
                        <View className='running-item-place'>
                          <Image src={ic_places} className='running-time-icon'/>
                          <Text className='running-item-burn-txt'>
                            {`数据上传站: ${localArea[item.point].name}`}
                          </Text>
                        </View>
                      </View>
                  }
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default List
