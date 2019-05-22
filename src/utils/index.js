import Mock from "mockjs";

export const promisify = (func, ctx) => {
  // 返回一个新的function
  return function () {
    // 初始化this作用域
    var ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        var args = Array.prototype.map.call(arguments, item => item);
        var err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err)
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    })
  };
};

export const promiseImage = (url) => {
  return new Promise(function (resolve, reject) {
    resolve(url)
  })
}
export const isChinese = (str) => {
  if (escape(str).indexOf("%u") < 0) return false
  return true
}

export const emoj2str = (str) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}
/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const delay = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export function installParams(props) {
  const queryStr = Object.keys(props)
    .reduce((ary, key) => {
      if (props[key]) {
        ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(props[key]));
      }
      return ary;
    }, [])
    .join('&');

  return `?${queryStr}`
}

export const logError = (name, action, info) => {
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = wx.getSystemInfoSync()
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  let time = formatTime(new Date())
  console.error(time, name, action, info, device)
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}


// 下载图片
export const downLoadImg = (imgurl, msg) => {
  return new Promise((resolve, reject) => {
    let that = this
    // util.showToast(msg + 'download...')
    wx.downloadFile({
      url: imgurl,
      complete: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          console.log('downloadstatusCode', res)
          reject(new Error(res))
        }
      },
      fail: function (res) {
        console.log('downloadFilefail', res)
      }
    })
  })
}

export const handleName = (str) => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}


export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/***
 * 生成模拟数据
 * @param value 数据量
 * @param type 返回类型
 * @returns {Array}
 */
export const setMockData = (value, type) => {
  let mock = []
  if (value === 0) return mock

  switch (type) {
    case 'ORDER': {
      for (let i = 0; i < value; i++) {
        let name = Mock.Random.cname()
        const props = {
          name,
          time: Mock.Random.time('HH:mm:ss'),
          burn: parseInt(Math.random() * 350),
        }
        mock.push(props)
      }
      return mock
    }
    case 'COMMENT': {
      for (let i = 0; i < value; i++) {
        let name = Mock.Random.cname()
        let mWords = Mock.Random.first().slice(0, 1)

        const props = {
          name,
          avatar: Mock.Random.image('120x120', `${Mock.Random.color()}`, '#FFF', `${mWords}`),
          date: Mock.Random.datetime('MM-dd HH:mm'),
          comment: Mock.Random.cparagraph(2),
          start: parseInt(Math.random() * 4) + 1,
        }
        mock.push(props)
      }
      return mock
    }

    default:
      break
  }

  return mock
}

/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  if (obj === null)
    return true;

  if (obj === undefined)
    return true;

  if (obj.length > 0)
    return false;

  if (obj.length === 0)
    return true;

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      return true
  }

  return true;
};

/**
 * 判断obj是否为空
 * @param e
 * @returns {boolean}
 */
export const isEmptyObject = (e) => {
  var t;
  for (t in e)
    return false;
  return true
};
