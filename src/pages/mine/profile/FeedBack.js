/**
 * @Author : HuiWen
 * @Date : 2019-05-25
 * @Description :
 **/

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'
import { pType } from '../../../constants/config'
import { AtIcon, AtTextarea, AtImagePicker } from 'taro-ui'
import { delay } from '../../../utils/index'

import './style.scss'

class FeedBack extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      type: 0,
      content: '',
      files: [],
      base: ''
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
    console.log("=== params -=--> ", params)
  }

  async initData(params) {
    const { type, base } = params
    this.setState({
      type: type * 1,
      base,
    })
  }

  handleChange(event) {
    let content = event.target.value
    this.setState({
      content
    })
  }

  onChange(files) {
    this.setState({
      files
    })
  }

  onFail(mes) {
    console.log("=== onFail >>> ", mes)
  }

  onImageClick(index, file) {
    console.log("=== onImageClick >>>", index, file)
  }

  async onSubmit() {
    const { content, files, base } = this.state
    if (!content) {
      return Taro.showToast({ title: '内容空', icon: 'none' })
    }

    await this._showLoading(true)
    const db = wx.cloud.database()

    await this._showLoading(false)
    await db.collection(`${base}`)
      .add({
        data: {
          content,
          due: new Date().getTime(),
        },
        success: res => {
          console.log("=== success res >>>", res)
          files && files.map((item) => {
            const drop = item.url.toLowerCase().split('.').pop()
            // let cloudPath = ('feedback/' + new Date().getTime() + "." + drop).toString()
            // if(base === 'apply')
            const cloudPath = (`${base}/` + new Date().getTime() + "." + drop).toString()

            wx.cloud.uploadFile({
              cloudPath,
              filePath: item.url,
              success: res1 => {
                console.log('[上传文件] 成功：', res1)

              },
              fail: err1 => {
                console.log('[上传文件] 失败：', err1)
              }
            })
          })
          Taro.showToast({ title: '反馈提交成功' })
        },
        fail: err => {
          Taro.showToast({ title: '网络出错，请稍后再试' })
          console.log("=== fail err >>>", err)
        }
      })

    await delay(2000)
    await this._showLoading(false)
    return Taro.navigateBack()
  }

  onCallForMaster = () => {
    wx.makePhoneCall({
      phoneNumber: '17600482550',
    })
  }

  render() {
    const { content, files, type } = this.state
    const isFeedback = type === pType.PUBLIC_MENU_CONTACT

    return (
      <View className='profile-page'>
        <View className='feedback-title-view'>
          <Text className='feedback-title-tips-txt'>
            {isFeedback ? '* 内容描述' : '* 自我介绍'}
          </Text>
        </View>
        <View className='feedback-content-view'>
          <AtTextarea
            className='feedback-content-input'
            value={content}
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder={isFeedback ? '问题是...' : '请做简单的自我介绍，可以描述自己的特长和经历...'}
            placeholderClass='feedback-content-input-placeholder-txt'
            height={270}
          />
        </View>
        <View className='feedback-title-view'>
          <Text className='feedback-title-tips-txt'>
            {isFeedback ? '* 添加图片(选填)' : '相关证件(选填)'}
          </Text>
        </View>

        <AtImagePicker
          length={3}
          files={files}
          multiple={true}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
          showAddBtn={files.length < 6}
        />


        <View className='feedback-submit-btn'>
          <View className='feedback-submit-btn-part' onClick={this.onSubmit}>
            <AtIcon value='share-2' size='15' color='#FFF'/>
            <Text className='feedback-submit-btn-txt'>
              {isFeedback ? '提交反馈' : '提交申请'}
            </Text>
          </View>
          <View className='feedback-submit-line'/>
          <View className='feedback-submit-btn-part' onClick={this.onCallForMaster}>
            <AtIcon value='phone' size='15' color='#FFF'/>
            <Text className='feedback-submit-btn-txt'>
              {'电话咨询'}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default FeedBack
