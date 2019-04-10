import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Image,
  Button
} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import Feed from '../../components/feed/feed'
import { delay, isEmpty, isEmptyObject } from '../../utils'
import logo from '../../images/logo.png'

import './index.scss'

@connect(({ home }) => ({ home }))

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subjects: [],
      count: 0,
    }
  }

  _showLoading = (loading) => {
    if (loading) {
      Taro.showLoading({ title: '加载中' })
    } else {
      Taro.hideLoading()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("=== nextProps -=-> ", nextProps)
    const { home } = nextProps

    if (home && !isEmptyObject(home)) {
      this._showLoading(home.loading)

      const {
        title,
        subjects,
        count,
      } = home

      this.setState({
        title,
        subjects,
        count,
      })
    }

  }

  onBtnClick = () => {
    const params = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '北京',
    }
    this.setState({
      loading: true,
    })

    dispatcher.home.loadList(params)
  }

  render() {
    console.log(">>> props -=-> ", this.props)
    const {
      title,
      subjects,
      count,
    } = this.state

    return (
      <View className='page-homepage'>
        {
          subjects.length ?
            subjects.map((item, index) => {
              // console.log("=== item -=--> ", item)
              return (
                <Feed
                  key={index + ''}
                  feed_source_img={item.images.medium}
                  feed_source_name={item.title}
                  feed_source_title={item.pubdates[0]}
                />
              )
            })
            :
            <Button className='home-btn' onClick={this.onBtnClick}>
              <Text className='home-btn-txt'>Load Data</Text>
            </Button>
        }
      </View>
    )
  }
}

export default Index

