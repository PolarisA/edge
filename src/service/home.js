/**
 * @Author : HuiWen
 * @Date : 2019-04-08
 * @Description :
 **/

import Request from '../utils/request'

export const loadListServer = (data) => {
  const {
    apikey,
    city,
  } = data

  const restful = {
    url: `?apikey=${apikey}&city=${city}`,
    method: 'GET',
  }

  return Request(restful)
}
