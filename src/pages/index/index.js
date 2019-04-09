import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Image,
  Button
} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { add, del, loadList } from '../../actions/index'
import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor(props) {
    super(props)

    this.state = {
      newTodo: ''
    }
  }

  saveNewTodo(e) {
    let { newTodo } = this.state
    if (!e.detail.value || e.detail.value === newTodo) return

    this.setState({
      newTodo: e.detail.value
    })
  }

  addTodo() {
    let { newTodo } = this.state
    let { add } = this.props

    if (!newTodo) return

    add(newTodo)
    this.setState({
      newTodo: ''
    })
  }

  delTodo(id) {
    let { del } = this.props
    del(id)
  }

  onBtnClick() {
    console.log("==== onBtnClick ")
    const { loadList } = this.props
    const params = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '北京',
    }

    loadList(params)
  }

  render() {
    // 获取未经处理的todos并展示
    let { newTodo } = this.state
    let { todos, add, del } = this.props
    console.log("=== index props -=-> ", this.props)

    return (
      <View className='page-homepage'>
        <View className='page-top'>
          <Text className='page-top-txt'>
            hello Index
          </Text>
        </View>


        <Button className='home-btn' onClick={this.onBtnClick.bind(this)}>
          <Text className='home-btn-txt'>Load Data</Text>
        </Button>

      </View>
    )
  }
}

export default connect(({ todos }) => ({
  todos: todos.todos,
}), (dispatch) => ({
  add(data) {
    dispatch(add(data))
  },
  del(id) {
    dispatch(del(id))
  },
  loadList(payload) {
    dispatch(loadList(payload))
  }
}))(Index)
