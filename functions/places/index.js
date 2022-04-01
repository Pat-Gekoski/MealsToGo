const { mocks, addMockImage } = require('./mock')
const url = require('url')
const functions = require('firebase-functions')

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference
  if (!ref) {
    restaurant.photos = [
      'http://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    ]
    return restaurant
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ]
  return restaurant
}

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query
  if (mock === 'true') {
    const data = mocks[location]
    if (data) {
      data.results = data.results.map(addMockImage)
    }

    return response.json(data)
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: 'restaurant',
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage)
      return response.json(res.data)
    })
    .catch((e) => {
      response.status(400)
      return response.send(e.response.data.error_message)
    })
}
