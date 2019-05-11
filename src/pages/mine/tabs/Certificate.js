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

import './index.styles.scss'
import ic_cert_tips from '../../../images/mine/ic_cert_tips.png'

const archStatus = {
  GET_NOW: '立即领取',
  USE_NOW: '立即使用',
  USE_DONE: '已使用',
  USE_LOST: '已失效',
}

const archList = [
  { id: 3010001, price: '50', status: true, dateStart: '2018-09-15', dateEnd: '2019-06-15', tips: archStatus.GET_NOW },
  { id: 3010002, price: '30', status: true, dateStart: '2018-10-20', dateEnd: '2019-01-31', tips: archStatus.USE_NOW },
  { id: 3010003, price: '80', status: false, dateStart: '2018-12-07', dateEnd: '2019-06-07', tips: archStatus.USE_DONE },
  { id: 3010004, price: '20', status: true, dateStart: '2018-11-11', dateEnd: '2019-08-11', tips: archStatus.GET_NOW },
  { id: 3010005, price: '100', status: false, dateStart: '2018-11-11', dateEnd: '2018-12-01', tips: archStatus.USE_LOST },
]

class Certificate extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("=== Certificate props -=-> ", this.props)

    return (
      <ScrollView
        className='tabs-page'
        scrollY={true}
        scrollWithAnimation
        scrollTop={0}
        lowerThreshold={20}
        upperThreshold={20}>
        {
          archList.map((item, index) => {
            return (
              <View key={`${index}`} className='cert-item-view'>
                <View className='cert-item-view-header'>
                  <Image src={ic_cert_tips} className={item.status ? 'cert-item-icon_write' : 'cert-item-icon_done'}/>
                </View>
                <View className='cert-item-view-line'>
                  <View className='cert-item-line-top'>
                    <View className='cert-item-view-cro-top'/>
                  </View>

                  <View className='cert-item-line-bottom'>
                    <View className='cert-item-view-cro-bottom'/>
                  </View>
                </View>

                <View className='cert-item-content-view'>
                  <View className='cert-item-price-box'>
                    <Text className='cert-item-price-head-txt'>{`￥`}
                      <Text className='cert-item-price-txt'>{item.price}</Text>
                    </Text>
                  </View>

                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

export default Certificate
