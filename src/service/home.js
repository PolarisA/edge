import api from '../service/api'

export const getHomeList = async function (params) {
  const { apikey, city } = params
  return api.get(`in_theaters?apikey=${apikey}&city=${city}`)
}
