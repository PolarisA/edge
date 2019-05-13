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

import ic_vips from '../../../images/mine/ic_vips_card_background.png'
import ic_qr_code from '../../../images/mine/ic_qr_code.png'
import ic_vips_txt from '../../../images/mine/ic_vip_tips_txt.png'
import './index.styles.scss'

class Vips extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onShowModal = () => {
    Taro.showModal({
      title: '会员二维码',
      content: 'XXXX',
    }).then(res => console.log(res.confirm, res.cancel))
  }

  render() {
    console.log("=== Vips props -=-> ", this.props)

    return (
      <View className='tabs-page'>
        <Image src={ic_vips} className='vip-card-background'/>

        <View className='vip-card-view'>
          <View className='vip-card-title'>
            <Text className='vip-card-title-txt'>
              {'柒橙卡 NO.014051'}
            </Text>

            <View className='vip-card-date-content'>
              <Text className='vip-card-date-txt'>
                {'有效期至'}
              </Text>
              <Text className='vip-card-date-txt'>
                {'2020-05-01'}
              </Text>
            </View>
          </View>
          <View className='vip-card-view-line'>
            <View className='vip-card-tips-line'>
              <Image src={ic_qr_code} className='vip-card-rqCode-image'/>
            </View>

            <Image src={ic_vips_txt} className='vip-card-tips-image'/>
          </View>
        </View>

        <View className='vip-card-rqCode-btn' onClick={this.onShowModal}>
          <Text className='vip-card-rqCode-btn-txt'>
            {'出示会员二维码'}
          </Text>
        </View>
      </View>
    )
  }
}

export { Vips }
