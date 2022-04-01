import camelize from 'camelize'
import axios from 'axios'
import { host, isMock } from '../../utils/env'

export const locationRequest = (searchTerm) => {
  return axios
    .get(`${host}/geocode`, {
      params: {
        city: searchTerm,
        mock: isMock,
      },
    })
    .then((res) => res.data)
}

export const locationTransform = (result) => {
  const formattedResponse = camelize(result)
  const { geometry = {} } = formattedResponse.results[0]
  const { lat, lng } = geometry.location

  return { lat, lng, viewport: geometry.viewport }
}
