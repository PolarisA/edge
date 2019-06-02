/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

// 请求连接前缀
export const baseUrl = 'https://ms-api.caibowen.net';
export const topList = 'http://v.juhe.cn/toutiao/index';
export const movieList = 'https://api.douban.com'

import ic_outdoor from '../images/home/ic_outdoor.png'
import ic_oval from '../images/home/ic_oval.png'
import ic_runner from '../images/home/ic_runner.png'
import ic_shower from '../images/home/ic_shower.png'
import ic_treadmil from '../images/home/ic_treadmill.png'

import ic_order_1 from '../images/number/number-1.png'
import ic_order_2 from '../images/number/number-2.png'
import ic_order_3 from '../images/number/number-3.png'
import ic_order_4 from '../images/number/number-4.png'
import ic_order_5 from '../images/number/number-5.png'
import ic_order_6 from '../images/number/number-6.png'
import ic_order_7 from '../images/number/number-7.png'
import ic_order_8 from '../images/number/number-8.png'
import ic_order_9 from '../images/number/number-9.png'
import ic_order_0 from '../images/number/number-0.png'

// 输出日志信息
export const noConsole = false;

export const localPoint = [
  { latitude: 40.8562, longitude: 111.6723 },
  { latitude: 40.8539, longitude: 111.6346 },
  { latitude: 40.8454, longitude: 111.6804 },
  { latitude: 40.8126, longitude: 111.6902 },
  { latitude: 40.8274, longitude: 111.6875 },
  { latitude: 40.8249, longitude: 111.6894 },
  { latitude: 40.8085, longitude: 111.6700 },
  { latitude: 40.8088, longitude: 111.6540 },
  { latitude: 40.8313, longitude: 111.7047 },
  { latitude: 40.8331, longitude: 111.7345 },
  { latitude: 40.8147, longitude: 111.6696 },
  { latitude: 40.8301, longitude: 111.7107 },
  { latitude: 40.8003, longitude: 111.7023 },
  { latitude: 40.7975, longitude: 111.6813 },
  { latitude: 40.8507, longitude: 111.7796 },
  { latitude: 40.8271, longitude: 111.6649 },
  { latitude: 40.8528, longitude: 111.6572 },
]

export const localArea = [
  { name: '成吉思汗大街店' },
  { name: '财经大学(回民区)店' },
  { name: '工业大学(新城区)店' },
  { name: '内蒙古大学（赛罕区）店' },
  { name: '将军衙署店' },
  { name: '鼓楼店' },
  { name: '青城公园店' },
  { name: '伊利广场店' },
  { name: '十四中店' },
  { name: '万达广场店' },
  { name: '海亮广场店' },
  { name: '长乐宫店' },
  { name: '学府康都店' },
  { name: '嘉茂购物中心店' },
  { name: '民族学院店' },
  { name: '国贸店' },
  { name: '体育场店' },
]

export const deviceInfo = ['淋浴', '跑步机', '椭圆机', '扩胸机', '陀螺仪']

export const deviceIcon = {
  SHOWER: ic_shower,
  TREADMILL: ic_treadmil,
  OVAL: ic_oval,
  CHEST: ic_outdoor,
  GYROSCOPE: ic_runner,
}

export const teamBuy = [
  {
    id: 6001,
    title: '单人7天体验卡',
    nowPrice: '88',
    originPrice: '198',
    picUrl: 'https://7163-qcitycloud-cffa3a-1258938492.tcb.qcloud.la/shop/pic_shop_06.jpg?sign=8a3eeccf1db2f92d3d488d316e187db5&t=1558418887',
    desc: '90天消费45'
  },
  {
    id: 6002,
    title: '单人14天体验卡',
    nowPrice: '168',
    originPrice: '288',
    picUrl: 'https://7163-qcitycloud-cffa3a-1258938492.tcb.qcloud.la/shop/pic_shop_09.jpeg?sign=5851f4e6549265a13e673b6367a287a2&t=1558422591',
    desc: '90天消费24'
  },
]

export const orderSort = [ic_order_1, ic_order_2, ic_order_3, ic_order_4, ic_order_5, ic_order_6, ic_order_7, ic_order_8, ic_order_9, ic_order_0]

export const pType = {
  RESERVATION: 0,
  EXERCISE: 1,
  BLOCKED_INVITES: 2,
  PlAN_UPDATE: 3,
  DEFINE_MUTEX: 4,
  MESSAGE_SYSTEM: 5,
  AUTO_INCREMENT: 6,
  PUBLIC_MENU_CONTACT: 7,
}

export const commentStart = [
  '⭐',
  '⭐⭐',
  '⭐⭐⭐',
  '⭐⭐⭐⭐',
  '⭐⭐⭐⭐⭐',
]

export const activityInfo = [
  '首次扫码,免费3次体验',
  '推荐新伙伴，最高可享受一个月免单券',
  '周燃脂第一名，最高可享受景甜矿泉水一箱',
]

/***
 *
 * @type {
 * {OPENING: {color: string, status: string},
 * RESTING: {color: string, status: string},
 * RENOVATE: {color: string, status: string},
 * ENOUGH: {color: string, status: string}}
 * }
 */
export const shopStatus = [
  { status: '正常营业', color: '#02A348' },
  { status: '正常营业', color: '#02A348' },
  { status: '正常营业', color: '#02A348' },
  { status: '正常营业', color: '#02A348' },
  { status: '休息中', color: '#D3D4D9' },
  { status: '休息中', color: '#D3D4D9' },
  { status: '装修中', color: '#424C55' },
  { status: '爆满', color: '#F6511D' },
  { status: '爆满', color: '#F6511D' },
  { status: '爆满', color: '#F6511D' },
]
