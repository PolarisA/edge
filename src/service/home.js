/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import Request from '../utils/request'

export const loadListServer = (data) => {
  const {
    type,
    token,
  } = data

  const params = {
    url: `type=${type}&key=${token}`,
    method: 'GET',
  }
  return Request(params)
}
