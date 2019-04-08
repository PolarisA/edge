import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Input,
  Text,
  Image
} from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { add, del } from '../../actions/index'
import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super()

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
  }

  render() {
    // 获取未经处理的todos并展示
    let { newTodo } = this.state
    let { todos, add, del } = this.props
    console.log("=== index props -=-> ", this.props)

    return (
      <View className='page-homepage'>
        <Text>
          hello Index
        </Text>
      </View>
    )
  }
}

export default connect(({ todos }) => ({
  todos: todos.todos
}), (dispatch) => ({
  add(data) {
    dispatch(add(data))
  },
  del(id) {
    dispatch(del(id))
  }
}))(Index)


// <View className='page page-index'>
//   <View className='logo'>
//   <Image src={logoImg} className='img' mode='widthFix' />
//   </View>
//
// <View className='page-title'>Taro UI</View>
// <View className='add_wrap'>
//   <Input placeholder="填写新的todo" onBlur={this.saveNewTodo.bind(this)} value={newTodo}/>
// <View className='add' onClick={this.addTodo.bind(this)}>+</View>
// </View>
// <View>{todosJsx}</View>
//
// </View>
